import InstaNav from "../components/Navbar";
import { ref, uploadBytes, listAll, getDownloadURL, } from "firebase/storage"
import { useState, useEffect } from "react";
import { storage } from "../config/firebase"
const OneImg = (props) => {
    const { loggedIn } = props
    const [fileUpload, setFileUpload] = useState(null)
    const [mainPic, setMainPic]=useState('')

    useEffect(()=>{
        const aboutMeImg= ref(storage, "imgs/a.webp")
        console.log(aboutMeImg)
    },[])

    const uploadFile = async () => {
        if (!fileUpload) return;
        
        const filesFolderRef = ref(storage, `imgs/${fileUpload.name}`);
    
        try {
            await uploadBytes(filesFolderRef, fileUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    setMainPic(url)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
    console.log(mainPic)
    return (
        <div>
            <InstaNav loggedIn={loggedIn} />
            <div className="w-full flex justify-between">
                <h1 className="text-2xl text-white underline m-8">Here is your Image:</h1>
                <div className="flex justify-center items-center mr-8">
                    <input type="file" className="mb-2 bg-slate-200 w-[200px]" onChange={(e) => setFileUpload(e.target.files[0])} />
                    <button className="bg-green-200 px-10 rounded border-2 border-green-700 py-2" onClick={uploadFile}>submit Vid</button>
                </div>
            </div>

            <div className="w-full justify-center flex">
                <img className="w-[600px] rounded border-2 border-green-200 mb-10" src={mainPic}></img>
            </div>
        </div>
    )
}

export default OneImg;