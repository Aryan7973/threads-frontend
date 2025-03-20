import { Button, Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import  UserPage  from "./pages/UserPage"
import  PostPage  from "./pages/PostPage"
import Header from "./components/Header"
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom.js"
import LogoutButton from "./components/LogoutButton.jsx"
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx"
import CreatePost from "./components/CreatePost.jsx"
function App() {
  
  const user = useRecoilValue(userAtom);

  return (
    <>
      <Container maxW='620px'>
        <Header/>
        <Routes>
            <Route path="/" element={ user?<HomePage/>:<Navigate to='/auth'/>}/>
            <Route path="/auth" element={user?<Navigate to='/'/>:<AuthPage/> } />
            <Route path="/update" element={user? <UpdateProfilePage/> :<Navigate to="/auth"/>}/>
            <Route path="/:username" element={<UserPage/>} />
            <Route path="/:username/post/:pid" element={<PostPage/>} />
        </Routes> 

        {/* {user && <LogoutButton/>} */}
        {user && <CreatePost/>}
      </Container>
    </>
  )
}

export default App
