'use client'

import { Label } from '@/components/ui/label'
import { initialSignUpFormData, userRegistrationformControls } from '../utils'
import CommonFormElement from '@/components/form-element/page'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { registerUserAction } from '@/actions'
import { useRouter } from 'next/navigation'

const SignUp = () => {

    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    // console.log(signUpFormData)

    const router = useRouter();

    function handleSignUpBtnValid() {
        return Object.keys(signUpFormData).every(key => signUpFormData[key].trim() !== '')
    }

    async function handleSignUp() {
        const result = await registerUserAction(signUpFormData);
        console.log(result);
        if (result?.data) {
            router.push("/sign-in")
        }
    }

    return (
        <div>
            <h1>User Registration</h1>
            <form action={handleSignUp}>
                {
                    userRegistrationformControls.map(controlItem => 
                    <div key={controlItem.name}>
                        <Label>{controlItem.label}</Label>
                        <CommonFormElement
                            value={setSignUpFormData[controlItem.name]}
                            currentItem={controlItem}
                            onChange={(event) => {
                                setSignUpFormData({
                                    ...signUpFormData,
                                    [event.target.name]: event.target.value
                                })
                            }}
                        />
                    </div>)
                }
                <Button disabled={!handleSignUpBtnValid()} className="disabled:opacity-55" type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp