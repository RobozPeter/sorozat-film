import { useState } from "react";
import { User } from "./user";
import {Link} from "react-router-dom"
import Regvalidation from "./Regvalidation";
function Signup() {
    const[username,setName]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[status,setstatus]=useState("")

    async function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault();
        setstatus(await Regvalidation(username,email,password))

        const value:User={
            id:0,
            username,
            email,
            password,
            filmek:[],
            sorozatok:[]
        }
        const res=await fetch("http://localhost:3000/signup", {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
        'Content-type': 'application/json'
      }})
      
    };

    return(
        <>
        <nav>
            <ul className="nav-list">
                <li >
                    <Link to="/" className="btn d-block text-decoration-none text-white">Login</Link>
                </li>
                <li className="active">
                    <Link to="/registform" className="btn d-block text-decoration-none text-white" aria-current="page">Register</Link>
                </li>
            </ul>
        </nav>
        <main>
            <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="bg-primary p-3 rounded w-25">
                <h2>Regisztráció</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder="Enter Name" name='name' className="form-control rounded-0" onChange={e=> setName(e.currentTarget.value)}/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" name='email' className="form-control rounded-0" onChange={e=> setemail(e.currentTarget.value)}/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name='password' className="form-control rounded-0" onChange={e=> setpassword(e.currentTarget.value)}/>
                    </div>
                    <span>{status}</span>
                    <button type="submit" className="btn btn-success w-100 rounded-0 mb-3"> Sign Up</button>
                </form>

            </div>
        </div>
        </main>
        </>
    )
}

export default Signup