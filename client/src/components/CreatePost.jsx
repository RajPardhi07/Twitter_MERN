import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";



const CreatePost = () => {
    return (
        <div className="w-[100%] ">
            <div>
                <div className="flex items-center border-b justify-between">
                    <div className="cursor-pointer w-full hover:bg-slate-300 px-4 py-3">
                        <h1 className="font-bold text-center text-lg text-gray-600">For You</h1>
                    </div>
                    <div className="w-full hover:bg-slate-300 cursor-pointer px-4 py-3">
                        <h1 className="font-bold text-lg text-center text-gray-600">Following</h1>
                    </div>
                </div>
                <div className='border-b'>
                    <div className='flex items-center gap-2 p-4'>
                        <Avatar src="https://plus.unsplash.com/premium_photo-1724076827133-593437b8f16a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                            size="50" className='object-cover' round={true} />

                            <input className='w-full outline-none border-none text-lg' type="text" placeholder='What is happening?!' />

                    </div>
                    <div className='flex items-center justify-between p-4'>
                        <div>
                        <CiImageOn />

                        </div>

                        <button className='px-4 py-1 text-lg text-white bg-blue-500 border-none rounded-full'>Post</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreatePost