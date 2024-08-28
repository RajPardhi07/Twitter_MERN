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
            const res = await axios.post(`${USER_API_END_POINT}/login`, {email, password}, {
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            });
            dispatch(getUser(res?.data?.user));
            if(res.data.success){
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }

    }
    return (
        <div className="main-register bg-blue-400 flex items-center justify-center w-full h-screen p-16">
            <div>
                <form onSubmit={submitHandler} className='formregister w-[29vw] bg-white rounded-lg py-2 flex flex-col items-center justify-around h-[60vh]'>
                    <h3 className='text-2xl'>Login Here</h3>

                    <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                     value={email} onChange={(e) => setEmail(e.target.value)}   type="text" name="email" id="email" placeholder="Email Id" />
                    <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                      value={password} onChange={(e) => setPassword(e.target.value)}  type="password" id="password" name="password" placeholder="Password" />

                    <button className='w-[25vw] h-[7vh] text-white font-semibold bg-black rounded-full border'>Login</button>

                    <Link to={'/register'}>
                        <button className='w-[22vw] h-[7vh] pl-3 rounded-full border text-white font-semibold bg-black'>Register</button>
                    </Link>


                </form>
            </div>


        </div>
    )
}

export default Login