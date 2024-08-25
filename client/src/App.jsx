import Home from "./components/Home"
import { Route, Routes } from "react-router-dom"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Register from "./components/Register"
// import LeftSidebar from "./components/LeftSidebar"
// import RightSidebar from "./components/RightSidebar"


const App = () => {
  return (
    <div>

      {/* <LeftSidebar/>
      <RightSidebar/> */}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>
  )
}

export default App