'use client'

import { logoutAction } from "@/actions";
const { Button } = require("../ui/button")

export default function Logout(){

    async function handleLogout(){
        await logoutAction();
    }

    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}