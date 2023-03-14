

import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Auth = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errTracker, setErrTracker]=useState(false)
    const [signTracker, setSignTracker] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const { loggedIn, setLoggedIn } = props
    const navigate = useNavigate()
    console.log(auth?.currentUser?.email)


    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user)
                setLoggedIn(user)
                navigate("/loggedIn")
            })
            .catch((error) => {
                console.log(error)
                setErrTracker(true)

            })
    }

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                setLoggedIn(user)
                navigate('/loggedIn')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setSignTracker(true)
            });
    }




    return (
        <div className="w-full h-screen items-center flex justify-center">
            <div className="bg-green-900 rounded border-2 border-green-200 flex flex-col w-[400px] h-[500px]  items-center">
                <h1 className="text-2xl text-white mb-10 mt-8">Welcome to NeW-INsTA</h1>
                <div className="w-[370px] flex flex-col mb-10">
                    <label className="text-lg text-white mb-3 underline ">Sign in:</label>
                    <input className="border-2 border-green-200 w-[350px] mb-5" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
                    <input className="border-2 border-green-200 w-[350px]" type="password" placeholder="Password.." onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="w-full flex justify-evenly">
                    <button className="bg-green-200 px-10 py-2 rounded border-2 border-green-700" onClick={signIn}>Sign In</button>
                    <button className="bg-green-200 px-10 py-2 rounded border-2 border-green-700" onClick={register}>Register</button>
                </div>
                    {errTracker && <p className="text-red-400">Email is already in use</p>}
                    {signTracker && <p className="text-red-400">Password is incorrect</p>}
            </div>

        </div>
    )
}