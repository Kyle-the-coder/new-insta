import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react"
import {  useNavigate } from "react-router-dom"



const InstaNav = (props)=>{
    const {loggedIn} = props
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    
    console.log(loggedIn.email)
    return(
        <div className="w-full h-[100px] bg-green-800 border-b-2 justify-between border-green-200 flex items-center">
            <h1 className="text-3xl text-white ml-8"> Welcome to New-Insta: <span className="text-green-300">{loggedIn.email}</span> </h1>
            <button onClick={logout} className="bg-green-200 px-10 py-2 rounded border-2 border-green-700 mr-8">logout</button>
        </div>
    )
}

export default InstaNav