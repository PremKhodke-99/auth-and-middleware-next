'use server'

import connectToDB from "@/database"
import User from "@/models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function registerUserAction(formData) {
    await connectToDB();

    try {
        const { userName, email, password } = formData;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return {
                success: false,
                message: "User already registered! register with another email",
            }
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newlyCreatedUser = new User({
            userName,
            email,
            password: hashedPassword
        });
        const savedUser = await newlyCreatedUser.save();

        if (savedUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(savedUser))
            }
        } else {
            return {
                success: false,
                message: "Something went wrong, please try again",
            }
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Something error occured',
        }
    }
}

export async function loginUserAction(formData) {
    await connectToDB();

    try {
        const { email, password } = formData;

        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return {
                success: false,
                message: "User does not exist please sign up"
            }
        }

        const checkPassword = await bcryptjs.compare(password, checkUser.password);

        if (!checkPassword) {
            return {
                success: false,
                message: "Password is incorrect"
            }
        }

        const createTokenData = {
            id: checkUser._id,
            userName: checkUser.userName,
            email: checkUser.email
        }

        const token = jwt.sign(createTokenData, "DEFAULT_KEY", { expiresIn: '1d' });

        const getCookies = cookies();
        getCookies.set('token', token);

        return {
            success: true,
            message: 'Login is successfull'
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Something error occured',
        }
    }
}

export async function fetchAuthUserAction() {
    await connectToDB();

    try {
        const getCookies = cookies();
        const token = getCookies.get("token")?.value || "";

        if (token === "") {
            return {
                success: false,
                message: "Token is invalid"
            }
        }

        const decodedToken = jwt.verify(token, "DEFAULT_KEY");
        const getUserInfo = await User.findOne({ _id: decodedToken.id });

        if (getUserInfo) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(getUserInfo))
            }
        } else {
            return {
                success: false,
                message: "Some error occured! please try again"
            }
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Something error occured',
        }
    }
}

export async function logoutAction() {
    const getCookies = cookies();
    getCookies.set("token", "");
}