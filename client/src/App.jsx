import Home from "./components/Home"
import { Route, Routes } from "react-router-dom"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Register from "./components/Register"
import Edit from "./components/Edit"
import AllusersPage from "./components/AllusersPage"
import Bookmark from "./components/Bookmark"
// import LeftSidebar from "./components/LeftSidebar"
// import RightSidebar from "./components/RightSidebar"


const App = () => {
  return (
    <div>

      {/* <LeftSidebar/>
      <RightSidebar/> */}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/allusers" element={<AllusersPage />} />
        <Route path="/bookmarks/:id" element={<Bookmark />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>
  )
}

export default App