import InstaNav from "../components/Navbar";
import plus from "../assets/plus.png"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { useState, useEffect } from "react";
import { storage } from "../config/firebase"
import { Link } from "react-router-dom";

const LandingPage = (props) => {
    const { loggedIn } = props
    const [fileUpload, setFileUpload] = useState(null)
    const [imageList, setImageList] = useState([])
    const [videoList, setVideoList] = useState([])

    const imageListRef = ref(storage, "imgs/")
    const videoListRef = ref(storage, "vids/")
    useEffect(() => {
        listAll(imageListRef)
            .then((res) => {
                res.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setImageList((prev) => [...prev, url])
                    })
                })
            })
        listAll(videoListRef)
            .then((res) => {
                res.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setVideoList((prev) => [...prev, url])
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
    const uploadVid = async () => {
        if (!fileUpload) return;
        const filesFolderRef = ref(storage, `vids/${fileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, fileUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    setVideoList((prev) => [...prev, url])
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <InstaNav loggedIn={loggedIn} />
            <div className="w-full h-[200px] flex items-center justify-evenly">
                <Link className="text-2xl text-white underline" to="/newuser">New User</Link>
                <Link className="text-2xl text-white underline" to="/yourimg">Your Image</Link>
                <Link className="text-2xl text-white underline" to="/yourvid">Your Video</Link>
                <div className="w-content ">
                    <input type="file" className=" bg-slate-200 w-[200px]" onChange={(e) => setFileUpload(e.target.files[0])} />
                    <button className="bg-green-200 px-10 rounded border-2 border-green-700 py-2" onClick={uploadFile}>submit Img</button>
                </div>
                <div className="w-content ">
                    <input type="file" className="mb-2 bg-slate-200 w-[200px]" onChange={(e) => setFileUpload(e.target.files[0])} />
                    <button className="bg-green-200 px-10 rounded border-2 border-green-700 py-2" onClick={uploadVid}>submit Vid</button>
                </div>
            </div>
            <div className="w-full flex flex-col">

                <h1 className="text-2xl text-white ml-5">Image Gallery:</h1>
                <div className="w-full flex flex-wrap h-full  ">
                    {imageList.map((url, i) => {
                        return (
                            <img key={i} className="w-[200px] m-5 object-cover rounded border-2 border-green-200" src={url} />
                        )
                    })}
                </div>
                <h1 className="text-2xl text-white ml-5">Video Gallery:</h1>
                <div className="w-11/12 flex flex-wrap h-full">
                    {videoList.map((url, i) => {
                        return (
                            <video autoPlay={true}  loop muted  controls=''  key={i} className="w-[300px] m-5 object-cover rounded border-2 border-green-200" src={url} ></video>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default LandingPage;