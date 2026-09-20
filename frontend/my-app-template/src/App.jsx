
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/navbar'
import DataPosts from './pages/dataPost'
import AddPost from './pages/AddPost'
import Edit from './pages/EditPost'
function App() {


  return (
    <>
      <BrowserRouter>
         <Navbar/>
         <Routes>
            <Route path='/' element={<DataPosts/>} />
            <Route path='/add-post' element={<AddPost/>} />
            <Route path='/edit-post/:id' element={<Edit/>} />
         </Routes>
      </BrowserRouter>
     
    </>  
  )
}

export default App
