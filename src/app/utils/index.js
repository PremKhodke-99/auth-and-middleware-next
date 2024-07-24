export const userRegistrationformControls = [
    {
        name: "userName",
        label: 'User Name',
        placeholder: "Please enter your username",
        componentType: 'input',
        type: 'text'
    },
    {
        name: "email",
        label: 'Email',
        placeholder: "Please enter your email",
        componentType: 'input',
        type: 'email'
    },
    {
        name: "password",
        label: 'Password',
        placeholder: "Please enter your password",
        componentType: 'input',
        type: 'password'
    },
]

export const userLoginformControls = [
    {
        name: "email",
        label: 'Email',
        placeholder: "Please enter your email",
        componentType: 'input',
        type: 'email'
    },
    {
        name: "password",
        label: 'Password',
        placeholder: "Please enter your password",
        componentType: 'input',
        type: 'password'
    },
]

export const initialSignUpFormData = {
    userName: '',
    email: '',
    password: ''
}

export const initialLoginFormData = {
    email: '',
    password: ''
}