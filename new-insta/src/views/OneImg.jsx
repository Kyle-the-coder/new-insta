import InstaNav from "../components/Navbar";
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { useState, useEffect } from "react";
import { storage } from "../config/firebase"
import { doc, setDoc, serverTimestamp, addDoc, collection, onSnapShot } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../config/firebase";
const OneImg = (props) => {
    const [file, setFile] = useState("");
    const [vidFile, setVidFile] =useState('')
    const [data, setData] = useState({});
    const [perc, setPerc] = useState(null);
    const { userInputs } = props
    const navigate = useNavigate()

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name


            console.log("name is", name)
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }

                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }))
                    });
                }
            );

        }
        file && uploadFile()

        const uploadVidFile = () => {
            const name = new Date().getTime() + vidFile.name


            console.log("name is", name)
            const storageRef = ref(storage, vidFile.name);
            const uploadTask = uploadBytesResumable(storageRef, vidFile);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }

                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, vid: downloadURL }))
                    });
                }
            );

        }
        vidFile && uploadVidFile()
    }, [file, vidFile])

    const handleInput = (e) => {
        const id = e.target.id
        const value = e.target.value
        setData({ ...data, [id]: value })
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await setDoc(doc(db, "admin", res.user.uid), {
                ...data,
                timeStamp: serverTimestamp()
            });
            navigate(-1)
        } catch (error) {
            console.log(error)
        }

    }
    console.log(file)
    return (
        <div>
            <InstaNav />
            <div className="w-full flex flex-col justify-between">
                <h1 className="text-2xl text-white underline m-8">Here is your Image:</h1>
                <div className="flex justify-center items-center mr-8">

                    <form onSubmit={handleAdd} className="flex flex-col w-[500px] m-5 items-start">
                        <div className="w-full flex flex-col">
                            <label htmlFor="file" className="my-1">
                            Profile Image:
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <label htmlFor="file" className="my-1">
                            Profile Video:
                            </label>
                            <input
                                type="file"
                                id="vidFile"
                                onChange={(e) => setVidFile(e.target.files[0])}
                            />
                        </div>

                        {userInputs.map((input) => (
                            <div className="formInput flex flex-col" key={input.id}>

                                <label>{input.label}</label>
                                <input className="p-1 mb-3 w-5/6" type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleInput} />
                            </div>
                        ))}
                        <button className="bg-green-200 px-10 rounded border-2 border-green-700 py-2" disabled={perc !== null && perc < 100} type="submit">Send</button>
                    </form>
                </div>

                <div className="w-full justify-center flex flex-col items-center">
                    <img className={`${file ? "w-[600px] ": "w-[100px]"} rounded border-2 border-green-200 mb-10`} src={file ? URL.createObjectURL(file) : "https://cdn-icons-png.flaticon.com/512/3004/3004613.png"}/>
                    <video className={`${vidFile ? "w-[600px] ": "w-[100px]"} rounded border-2 border-green-200 mb-10`} autoPlay={true}  loop muted  controls='' src={vidFile ? vidFile : " "}>no vid</video>
                </div>
            </div>
        </div>
    )
}

export default OneImg;