import { Login } from './loginpage'
import Signup from './registform' 
import Homepage from './uj'
import Page from './listingPage'
import {BrowserRouter, Routes,Route} from "react-router-dom"
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} ></Route>
      <Route path='/registform' element={<Signup/>} ></Route>
      <Route path='/listingPage' element={<Page/>} ></Route>
      <Route path='/uj' element={<Homepage/>} ></Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
