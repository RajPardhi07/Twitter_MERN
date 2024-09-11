import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
// import logo from "../../public/Twitter_logo.svg.png"
import "../style/Register.css"

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUserame] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [work, setWork] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

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
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className="main-register relative overflow-hidden bg-black flex flex-col  items-center justify-evenly w-full h-screen">
            <div>
                <h1 id="Xlogo" className="absolute lg:left-32 lg:-top-28 top-2 text-[16vw] md:text-[13vw] text-center xl:text-[40vw] font-extralight text-white">X</h1>
                <p className="text-white absolute text-[3vw] xl:top-[8%] xl:left-32 bottom-2 left-44 md:left-[45%]">Twitter</p>
                

            </div>
            <div>
                <form onSubmit={submitHandler} className='formregister absolute top-28 left-5 lg:left-[50%] lg:top-[10%] xl:w-[29vw] h-[80vh] w-[90vw]  md:ml-10 xl:ml-0  bg-white rounded-lg py-2 flex flex-col items-center justify-around'>
                    <h3 className='text-2xl'>Register Here</h3>

                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                        className='xl:w-[25vw] w-[80vw] h-[7vh] pl-3 rounded-full border'
                        type="email" name="email" id="email" placeholder="Email Id" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                     className='xl:w-[25vw] w-[80vw] h-[7vh] pl-3 rounded-full border'
                        type="password" id="password" name="password" placeholder="Password" />

                    <input value={name} onChange={(e) => setName(e.target.value)}
                        className='xl:w-[25vw] w-[80vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="email" id="email" placeholder="Name" />


                    <input value={username} onChange={(e) => setUserame(e.target.value)}
                        className='xl:w-[25vw] w-[80vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="Username" id="Username" placeholder="Username" />
                    <input value={work} onChange={(e) => setWork(e.target.value)}
                        className='xl:w-[25vw] w-[80vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="work" id="work" placeholder="Work" />
                    <input value={location} onChange={(e) => setLocation(e.target.value)}
                        className='xl:w-[25vw] w-[80vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="location" id="location" placeholder="Location" />
                    <button type="submit" className='xl:w-[25vw] w-[80vw] h-[7vh] text-white font-semibold bg-black rounded-full border'>
                        {loading ? <span className="loading loading-spinner loading-md"></span>

                            : "Register"}
                    </button>

                    <Link to={'/login'}>
                        <button className='xl:w-[25vw] w-[80vw] h-[7vh] pl-3 rounded-full border text-white font-semibold bg-black'>
                            Login
                        </button>
                    </Link>


                </form>
            </div>


        </div>
    )
}

export default Register