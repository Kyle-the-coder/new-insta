import InstaNav from "../components/Navbar";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { useState, useEffect } from "react";
import { storage } from "../config/firebase"


const OneVid = (props) => {
    const { loggedIn } = props
    const [fileUpload, setFileUpload] = useState(null)
    const [mainVid, setMainVid] = useState('')

    const uploadFile = async () => {
        if (!fileUpload) return;

        const filesFolderRef = ref(storage, `vids/${fileUpload.name}`);

        try {
            await uploadBytes(filesFolderRef, fileUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    setMainVid(url)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
    console.log(mainVid)
    return (
        <div>
            <InstaNav loggedIn={loggedIn} />
            <div className="w-full flex justify-between ">
                <h1 className="text-2xl text-white underline m-8">Here is your Video:</h1>
                <div className="flex justify-center items-center mr-8 ">
                    <input type="file" className="mb-2 bg-slate-200 w-[200px]" onChange={(e) => setFileUpload(e.target.files[0])} />
                    <button className="bg-green-200 px-10 rounded border-2 border-green-700 py-2" onClick={uploadFile}>submit Vid</button>
                </div>
            </div>

            <div className="w-full justify-center flex">
                <video autoPlay={true} loop muted controls='' className="w-[800px] mb-20 object-cover rounded border-2 border-green-200" src={mainVid} ></video>
            </div>
        </div>
    )
}

export default OneVid;