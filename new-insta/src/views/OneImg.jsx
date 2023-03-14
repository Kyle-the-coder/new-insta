import InstaNav from "../components/Navbar";

const OneImg = (props) => {
    const { loggedIn } = props
    return (
        <div>
            <InstaNav loggedIn={loggedIn} />
            <div className="w-full flex justify-between">
                <h1 className="text-2xl text-white underline m-8">Here is your Image:</h1>
                <button className="bg-green-200 px-10 rounded border-2 border-green-700 py-2 m-8">Edit Image</button>
            </div>

            <div className="w-full justify-center flex">
                <img className="w-[600px] rounded border-2 border-green-200 mb-10" src="https://firebasestorage.googleapis.com/v0/b/newphoto-61e6b.appspot.com/o/imgs%2Faa.webp?alt=media&token=854f83ef-e372-4041-9995-db9fc328dac7"></img>
            </div>
        </div>
    )
}

export default OneImg;