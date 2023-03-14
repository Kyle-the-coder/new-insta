import InstaNav from "../components/Navbar";
import plus from "../assets/plus.png"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { useState, useEffect } from "react";
import { storage } from "../config/firebase"

const LandingPage = (props) => {
    const { loggedIn } = props
    const [fileUpload, setFileUpload] = useState(null)
    const [imageList, setImageList] = useState([])

    const imageListRef = ref(storage, "imgs/")
    useEffect(() => {
        listAll(imageListRef)
            .then((res) => {
                res.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setImageList((prev) => [...prev, url])
                    })
                })
            })
    }, [])
    const uploadFile = async () => {
        if (!fileUpload) return;
        const filesFolderRef = ref(storage, `imgs/${fileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, fileUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    setImageList((prev) => [...prev, url])
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <InstaNav loggedIn={loggedIn} />
            <h1 className="text-2xl text-white underline ml-8 mt-8">Your Gallery:</h1>
            <div className="  w-[450px] bottom-10 right-8 flex justify-evenly  items-center  fixed cursor-pointer">
                <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
                <button className="bg-green-200 px-10 py-2 rounded border-2 border-green-700 mr-8" onClick={uploadFile}>submit</button>
            </div>
            <div className="w-full flex justify-center">
                <div className="w-11/12 flex flex-wrap h-full">
                    {imageList.map((url, i) => {
                        return (
                            <img key={i} className="w-[200px] m-5 object-cover rounded border-2 border-green-200" src={url} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default LandingPage;