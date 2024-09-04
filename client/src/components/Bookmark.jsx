import { FaRegCommentAlt, FaRegHeart } from "react-icons/fa"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from "./RightSidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { IoMdBookmark } from "react-icons/io";
import { formatDistanceToNow } from 'date-fns';

const Bookmark = () => {



  const { id } = useParams();

  const [allSaveTweet, setAllSaveTweet] = useState();

  console.log("Bullet 350", allSaveTweet)

  useEffect(() => {
    const AllTweet = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/user/getBookmark/${id}`)
        console.log("AllSavedTweet", res?.data?.bookmarks)
        setAllSaveTweet(res?.data?.bookmarks)
      } catch (error) {
        console.log(error)
      }
    }

    AllTweet();
  }, [])
  return (
    <div>
      <div className="bg-red-300">

        <LeftSidebar />
      </div>

      <div className="w-[48vw] border left-[25%]   absolute ">
        <div className="border-b h-[12vh] flex items-center justify-center">
          <h1 className="text-3xl font-semibold">All Saved Tweets</h1>
        </div>

        <div className="w-full">



          {allSaveTweet && allSaveTweet.map((item, index) => (
            <div key={index} className=' border-b border-gray-200'>
              <div>
                <div className='flex items-center gap-2 p-4'>



                  <div className='w-full'>

                    <div className='flex gap-3 w-[45vw]'>


                      <div className='w-[4vw] h-[7vh] '>

                        {/* {tweet?.userDetails && tweet?.userDetails?.map((data, index) => (

                          <img key={index}
                            className="w-[3vw] h-[3vw] border cursor-pointer rounded-full object-top object-cover"
                            src={data?.profileImg}
                            alt=""

                          />
                        ))} */}
                      </div>

                      <div>


                        <div className='flex items-center gap-2'>
                          <h1 className='font-bold'>{item?.userDetails?.name}</h1>
                          <p>{item?.userDetails?.username} </p>

                          <p className='text-sm text-slate-500'>  {formatDistanceToNow(new Date(item?.created), { addSuffix: true })}</p>


                        </div>
                        <div>
                          <p>{item?.description}</p>
                        </div>
                      </div>
                    </div>


                    <div className='flex justify-between my-3'>
                      <div className='flex cursor-pointer gap-2 items-center'>
                        <FaRegCommentAlt />
                        <p>{item?.comments?.length}</p>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <FaRegHeart className='hover:text-red-600' />
                        <p>{item?.likes?.length}</p>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <IoMdBookmark />



                      </div>


                    </div>




                  </div>


                </div>
              </div>
            </div>
          ))}

        </div>
      </div>


      <div>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Bookmark