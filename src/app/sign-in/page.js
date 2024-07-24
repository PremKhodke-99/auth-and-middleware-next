'use client'

import React, { useState } from 'react'
import { initialLoginFormData, userLoginformControls } from '../utils'
import { Label } from '@/components/ui/label'
import CommonFormElement from '@/components/form-element/page'
import { Button } from '@/components/ui/button'
import { loginUserAction } from '@/actions'
import { useRouter } from 'next/navigation'

const SignIn = () => {

    const [signinFormData, setSignInFormData] = useState(initialLoginFormData);
    const router = useRouter();

    async function handleSignin(){
        const result = await loginUserAction(signinFormData);
        
        if(result?.success){
            router.push("/")
        }
    }

  return (
    <div>
        <h1>Login</h1>
        <form action={handleSignin}>
            {
                userLoginformControls.map(controlItem => 
                <div key={controlItem.name}>
                    <Label>{controlItem.label}</Label>
                    <CommonFormElement 
                        currentItem={controlItem}
                        value={setSignInFormData[controlItem.name]}
                        onChange={(event) => setSignInFormData({
                            ...signinFormData,
                            [event.target.name]: event.target.value
                        })}
                    />
                </div>)
            }
            <Button type="submit">Sign In</Button>
        </form>
    </div>
  )
}

export default SignIn