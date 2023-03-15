
import { useContext, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Autho = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)


    const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user })
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                setError(true)
            });
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="w-[400px] h-[400px] justify-start  flex flex-col items-center bg-green-800 border-2 rounded border-green-200">
                <h1 className="m-5 text-2xl text-white">Welcome to New-Insta</h1>
                <form onSubmit={handleLogin} className="flex flex-col w-5/6 m-5 items-center">
                    <input className="p-1 mb-5 w-5/6"  type="text" placeholder="email..." onChange={(e) => setEmail(e.target.value)} />
                    <input className="p-1 mb-5 w-5/6"  type="password" placeholder="password..." onChange={(e) => setPassword(e.target.value)} />
                    <button className="bg-green-200 px-10 rounded border-2 border-green-700 py-2"  type="submit">Login</button>
                    {error && <span className="text-red-400 m-5">wrong email or password</span>}

                </form>
            </div>
        </div>
    )
}

export default Autho;