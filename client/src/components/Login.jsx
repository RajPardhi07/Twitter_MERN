import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="main-register bg-blue-400 flex items-center justify-center w-full h-screen p-16">
            <div>
                <form className='formregister w-[29vw] bg-white rounded-lg py-2 flex flex-col items-center justify-around h-[60vh]'>
                    <h3 className='text-2xl'>Login Here</h3>

                    <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="email" id="email" placeholder="Email Id" />
                    <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="password" id="password" name="password" placeholder="Password" />

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