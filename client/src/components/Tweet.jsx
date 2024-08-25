import Avatar from 'react-avatar';
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { FaRegBookmark } from "react-icons/fa6";


const Tweet = () => {
    return (
        <div className='border-b border-gray-200'>
            <div>
                <div className='flex items-center gap-2 p-4'>
                    <Avatar src="https://plus.unsplash.com/premium_photo-1724076827133-593437b8f16a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                        size="50" className='object-cover' round={true} />

                    <div className='w-full'>

                        <div className='flex items-center gap-2'>
                            <h1 className='font-bold'>Raj</h1>
                            <p>@rajmerndev  .1m</p>

                        </div>
                        <div>
                            <p>Hello developer lets connect and grow together.</p>
                        </div>

                        <div className='flex justify-between my-3'>
                            <div className='flex gap-2 items-center'>
                                <FaRegCommentAlt />
                                <p>0</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <FaRegHeart />
                                <p>0</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <FaRegBookmark />
                                <p>0</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Tweet