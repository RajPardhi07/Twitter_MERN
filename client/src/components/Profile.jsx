import LeftSidebar from "./LeftSidebar"
import RightSidebar from "./RightSidebar"

const Profile = () => {
    return (

        <div>

            <LeftSidebar/>


            <div className=" mx-auto w-[70%] flex ml-[24%]">


                <div className="w-[71%] border">
                    <div className="w-full h-[10vh] text-2xl flex items-center p-3 gap-6">
                        <i className="ri-arrow-left-line"></i>
                        <p className="font-extrabold">Raj p.</p>
                    </div>

                    <div className="w-full border-b h-[70vh]">
                        <div
                            style={{
                                backgroundImage:
                                    "url(https://images.unsplash.com/photo-1722851448925-f6cf5cc8da77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                            }}
                            className="w-full h-[30vh] bg-cover bg-center bg-red-300"
                        ></div>

                        <div className="flex px-5 justify-between">
                            <div>
                                <h2 className="text-4xl font-bold">Raj Pardhi</h2>
                                <h4 className="text-xl text-slate-700">rajpardhi@gmail.com</h4>
                                <p className="text-xl">Software developer</p>
                            </div>
                            <div className="-mt-16">
                                <img
                                    className="w-[10vw] h-[10vw] border cursor-pointer rounded-full object-top object-cover"
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""

                                />
                                <input
                                    type="file"
                                    accept="image/*"

                                    className="mt-2"
                                    hidden

                                />
                            </div>
                        </div>

                        <div className="flex gap-2 text-xl ml-5 mt-7">
                            <i className="ri-map-pin-2-fill"></i>
                            <p>Bhopal</p>
                        </div>

                        <div className="flex mt-4 px-5 items-center justify-between">
                            <div className="flex gap-5 text-xl">
                                <p>
                                    <span className="font-bold">700</span> Followers
                                </p>
                                <p>
                                    <span className="font-bold">200</span> Following
                                </p>
                            </div>
                            <button className="px-6 py-2 text-xl rounded-full border">
                                Edit Profile
                            </button>

                        </div>
                    </div>

                    <form className="mt-3">
                        <h4 className="text-xl uppercase">Create Your Post</h4>
                        <textarea
                            className="mt-3  resize-none h-24 rounded-md w-full" name="" id="" />



                        <button className="bg-blue-500 px-16 py-2 text-2xl rounded-lg text-white">Create Post</button>
                    </form>

                    <div className="mt-5">
                        <h4 className="text-2xl font-bold mb-4">Your Tweets</h4>

                    </div>

                </div>


            </div>


            <RightSidebar/>

        </div>
    )
}

export default Profile