import { Login } from './loginpage'
import Signup from './registform' 
import Homepage from './home'
import {BrowserRouter, Routes,Route} from "react-router-dom"
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} ></Route>
      <Route path='/registform' element={<Signup/>} ></Route>
      <Route path='/home' element={<Homepage/>} ></Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
