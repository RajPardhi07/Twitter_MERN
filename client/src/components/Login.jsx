import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { USER_API_END_POINT } from "../utils/constant";
import { getUser } from "../redux/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            dispatch(getUser(res?.data?.user));
            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }

    }
    return (
        <div className="main-register bg-white relative w-full h-screen ">

            <div className="flex flex-col gap-6">
                <div>

                <h1 className="text-[5vw] absolute left-[30%] lg:left-[10%] text-center font-bold">Happening now</h1>
                <h3 className="text-[3vw] absolute left-[30%] top-8 lg:left-[1%] lg:top-24 ml-[9vw] font-bold">Join Today.</h3>
                </div>
                <img className="w-[55vw] absolute top-16 left-24 lg:top-[25%] lg:left-10" src="https://logolook.net/wp-content/uploads/2021/06/Twitter-Log%D0%BE.png" alt />
            </div>

            <div className="flex items-center justify-center">


                <form onSubmit={submitHandler} className='formregister absolute top-[25%] lg:top-[25%] lg:left-[53%] border w-[85vw] lg:w-[29vw] bg-white shadow-2xl rounded-lg py-2 flex flex-col items-center justify-around h-[60vh]'>
                    <h3 className='text-2xl'>Login Here</h3>

                    <input className='lg:w-[25vw] w-[74vw] h-[7vh] pl-3 rounded-full border'
                        value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder="Email Id" />
                    <input className='lg:w-[25vw] w-[75vw] h-[7vh] pl-3 rounded-full border'
                        value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Password" />

                    <button className='lg:w-[25vw] w-[75vw] h-[7vh] text-white font-semibold bg-black rounded-full border'>Login</button>

                    <Link to={'/register'}>
                        <button className='lg:w-[22vw] w-[75vw] h-[7vh] pl-3 rounded-full border text-white font-semibold bg-black'>Register</button>
                    </Link>


                </form>
            </div>


        </div>
    )
}

export default Login