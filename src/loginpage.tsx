import { useState,useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { User } from './user'
import validation from './validation'
export function Login(){
const [data,setdata]=useState([] as User[])
  const navigate=useNavigate()
  const [name,setname]=useState("")
  const [password,setpassword]=useState("")
  const [errors,setErrors]=useState("")

    useEffect(()=>{
      async function load() {
        try {
          const response=await fetch("http://localhost:3000/")
          const adat=await response.json() as User[]
          setdata(adat)
          
        } catch (error) {
          console.log(error)
        }
      }
      load()
    },[])
  const handlesubmit=(event: { preventDefault: () => void })=>{
    event.preventDefault()
    //setErrors(validation(name,password))
    if(errors!=""){
      navigate("/home")
    }
  }
    
  return (
    <>
      <nav>
            <ul className="nav-list">
                <li className="active">
                    <a href="index.html" aria-current="page">Login</a>
                </li>
                <li>
                    <Link to="/registform" className="btn d-block text-decoration-none text-white">Register</Link>
                </li>
            </ul>
        </nav>
        <main>
            <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
          <div className="bg-primary p-3 rounded w-25">
              <h2>Bejelentkezés</h2>
              <form onSubmit={handlesubmit}>
                  <div className="mb-3">
                      <label htmlFor="email"><strong>Email</strong></label>
                      <input type="email" placeholder="Enter Email" name='email' className="form-control rounded-0" onChange={e=>{setname(e.target.value)}} />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="password"><strong>Password</strong></label>
                      <input type="password" placeholder="Enter Password" name='password' className="form-control rounded-0" onChange={e=>{setpassword(e.target.value)}}/>
                  </div>
                  <button type="submit" className="btn btn-success w-100 rounded-0 mb-3"> Login</button>
                  <span>{errors}</span>
              </form>

          </div>
        </div>
      </main>
    </>
      
  )
  
}