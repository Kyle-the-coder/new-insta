import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import { collection, serverTimestamp, getDoc, deleteDoc, doc, setDoc, onSnapshot } from "firebase/firestore"
import InstaNav from "../components/Navbar";
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage"


const UserVid = () => {
    const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [perc, setPerc] = useState(null);
    const [vidSrc, setVidSrc] = useState(null)

    useEffect(() => {
        const getVideo = async () => {
            const docRef = doc(db, "admin", "wZPPGbn117RfQ59NpEq5ldYz1Zi1");
            const docSnap = await getDoc(docRef);
            setData(docSnap.data())

        }
        getVideo()


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
                        setData((prev) => ({ ...prev, vid: downloadURL }))
                        
                        setVidSrc(downloadURL)
                    });
                }
            );

        }
        file && uploadFile()
    }, [file])
    console.log("data is", data)

    const editPhoto = async () => {
        try {
            await setDoc(doc(db, "admin", "wZPPGbn117RfQ59NpEq5ldYz1Zi1"), {
                ...data,
                timeStamp: serverTimestamp()
            });
            alert("image went through")
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div>
            <div>
                <InstaNav />
            </div>
            <h1 className="text-2xl text-white ml-5 underline my-5">{data.userName} Image:</h1>
            <div className="w-full flex justify-center">

                <video autoPlay={true} loop muted controls='' className="w-[800px] m-5 object-cover rounded border-2 border-green-200" src={file ? vidSrc : data.vid} ></video>
            </div>

            <div className="w-full flex flex-col items-center h-screen">
                <label className="text-2xl text-white m-5 underline">Edit Video:</label>
                <input type="file" className="m-8" onChange={(e) => setFile(e.target.files[0])} />
                <button disabled={perc !== null && perc < 100} className="bg-green-200 disabled:opacity-75 disabled:bg-red-200 px-10 rounded border-2 border-green-700 py-2" onClick={editPhoto}>Submit</button>
            </div>
        </div>
    )
}
export default UserVid;