import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="main-register bg-green-700 flex items-center justify-center w-full h-screen p-16">
            <div>
                <form className='formregister w-[29vw] bg-white rounded-lg py-2 flex flex-col items-center justify-around h-[60vh]'>
                    <h3 className='text-2xl'>Register Here</h3>

                    <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="text" name="email" id="email" placeholder="Email Id" />
                    <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                        type="password" id="password" name="password" placeholder="Password" />

                    <button className='w-[25vw] h-[7vh] text-white font-semibold bg-black rounded-full border'>Register</button>

                    <Link to={'/login'}>
                        <button className='w-[22vw] h-[7vh] pl-3 rounded-full border text-white font-semibold bg-black'>Login</button>
                    </Link>


                </form>
            </div>


        </div>
  )
}

export default Register