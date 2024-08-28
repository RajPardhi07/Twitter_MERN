import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUserame] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [work, setWork] = useState("");
    const [location, setLocation] = useState("");
    

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:8080/api/user/register`, { name, username, email, password, location, work }, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error('This is an error when register user');
            console.log(error)
        }

    }
    return (
        <div className="main-register bg-green-700 flex items-center justify-center w-full h-screen p-16">
            <div>
                <form onSubmit={submitHandler} className='formregister w-[29vw] h-[80vh] bg-white rounded-lg py-2 flex flex-col items-center justify-around'>
                    <h3 className='text-2xl'>Register Here</h3>

                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                        className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="email" name="email" id="email" placeholder="Email Id" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="password" id="password" name="password" placeholder="Password" />

                    <input value={name} onChange={(e) => setName(e.target.value)}
                        className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="email" id="email" placeholder="Name" />


                    <input value={username} onChange={(e) => setUserame(e.target.value)}
                        className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="Username" id="Username" placeholder="Username" />
                    <input value={work} onChange={(e) => setWork(e.target.value)}
                        className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="work" id="work" placeholder="Work" />
                    <input value={location} onChange={(e) => setLocation(e.target.value)}
                        className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="location" id="location" placeholder="Location" />
                    <button type="submit" className='w-[25vw] h-[7vh] text-white font-semibold bg-black rounded-full border'>Register</button>

                    <Link to={'/login'}>
                        <button className='w-[22vw] h-[7vh] pl-3 rounded-full border text-white font-semibold bg-black'>Login</button>
                    </Link>


                </form>
            </div>


        </div>
    )
}

export default Register