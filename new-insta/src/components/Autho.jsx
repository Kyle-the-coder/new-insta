

import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp, addDoc, collection, onSnapShot } from "firebase/firestore";
import { db, getAuth, storage } from "../config/firebase";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Auth = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errTracker, setErrTracker] = useState(false)
    const [signTracker, setSignTracker] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const { loggedIn, setLoggedIn } = props
    const { userInputs } = props
    const [data, setData] = useState({});
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

    const handleInput = (e) => {
        const id = e.target.id
        const value = e.target.value
        setData({ ...data, [id]: value })
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await setDoc(doc(db, "users", res.user.uid), {
                ...data,
                timeStamp: serverTimestamp()
            });
            navigate(-1)
        } catch (error) {
            console.log(error)
        }

    }




    return (
        <div className="w-full h-screen items-center flex justify-center">
            <div className="bg-green-900 rounded border-2 border-green-200 flex flex-col w-[400px] h-[500px]  items-center">
                <h1 className="text-2xl text-white mb-10 mt-8">Welcome to NeW-INsTA</h1>
                <div className="w-[370px] flex flex-col mb-5">
                    {userInputs.map((input) => (
                        <div key={input.id}>
                            <label className="text-lg text-white mb-3 underline ">{input.label}</label>
                            <input className="border-2 border-green-200 w-[350px] mb-2" type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleInput} />
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-evenly mb-5">
                    <button className="bg-green-200 px-10 py-2 rounded border-2 border-green-700" onClick={handleAdd}>Sign In</button>
                </div>
                {errTracker && <p className="text-red-400">Email is already in use</p>}
                {signTracker && <p className="text-red-400">Password is incorrect</p>}
            </div>

        </div>
    )
}