
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/navbar'
import DataSiswa from './pages/dataSiswa'
import AddSiswa from './pages/AddSiswa'
import Edit from './pages/EditSiswa'
function App() {


  return (
    <>
      <BrowserRouter>
         <Navbar/>
         <Routes>
            <Route path='/' element={<DataSiswa/>} />
            <Route path='/add-siswa' element={<AddSiswa/>} />
            <Route path='/edit-siswa/:id' element={<Edit/>} />
         </Routes>
      </BrowserRouter>
     
    </>  
  )
}

export default App
