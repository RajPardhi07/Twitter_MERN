import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {

    const { id } = useParams();
    console.log('sigle', id)
    const navigate = useNavigate();

    const [value, setValue] = useState({
        id: id,
        name: '',
        username: '',
        work: '',
        location: '',
        bio:''
    });

    useEffect(() => {
        const singleUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/user/singleuser/${id}`)
                console.log("singleUserData", res?.data?.user);
                setValue({
                    ...value, name: res?.data?.user?.name,
                    username: res?.data?.user?.username,
                    work: res?.data?.user?.work,
                    location: res?.data?.user?.location,
                    bio: res?.data?.user?.bio,
                })
            } catch (error) {
                console.log(error)
            }
        }

        singleUserData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/user/edit/${id}`, value)

            navigate('/')
            toast.success(res.data.message);
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div className='w-full h-screen flex' >
            <div className='w-[50%] h-full '>
                <h1 className='text-[9vh] text-center font-bold'>Edit User Now</h1>

                <img className='mt-3' src="https://logolook.net/wp-content/uploads/2021/06/Twitter-Log%D0%BE.png" alt="" />

            </div>

            <div className='w-[50%] h-full flex items-center justify-center bg-white'>
                <form onSubmit={handleSubmit} className='formregister h-[73vh] w-[29vw] bg-gray-300 rounded-lg py-2 flex flex-col items-center justify-around '>
                    <h3 className='text-2xl'>Update User</h3>
                    <input value={value?.name} className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        onChange={e => setValue({ ...value, name: e.target.value })}
                        type="text" id='name'
                        name="name" placeholder="Name" />
                    
                    <input value={value?.username} className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        onChange={e => setValue({ ...value, username: e.target.value })}
                        type="text" id='username'
                        name="username" placeholder="Username" />
                  

                    <input value={value?.work} className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        onChange={e => setValue({ ...value, work: e.target.value })}

                        type="text" id='work' name="work" placeholder="Work" />
                    <input value={value?.location} className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        onChange={e => setValue({ ...value, location: e.target.value })}

                        type="text" id='location' name="location" placeholder="Location" />
                    <input value={value?.bio} className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        onChange={e => setValue({ ...value, bio: e.target.value })}

                        type="text" id='bio' name="bio" placeholder="Bio" />
                    <button type="submit" className='w-[25vw] h-[7vh] text-white font-semibold bg-black rounded-full border'>Update</button>

                    <Link to={`/profile/${id}`}>
                        <button className='w-[22vw] h-[7vh] pl-3 rounded-full border text-white font-semibold bg-black'>Go Back</button>
                    </Link>


                </form>
            </div>
        </div>
    )
}

export default Edit