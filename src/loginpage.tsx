import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { User } from './user'
let user:User
export function thisUser(){
  return user
}
export function Login() {
  const navigate = useNavigate()
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  const [errors, setErrors] = useState("")

  const handlesubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const values = {
      email: name,
      password: password
    }
    await fetch("http://localhost:3000/login", {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => {
      console.log(res.statusText)
      if (res.status == 200) {
        user=res.json as User
        navigate("/home")
      } else if (res.status == 201) {
        setErrors("Hibás név vagy jelszó")
      } else {
        setErrors("Szerver oldali hiba")
      }
    })
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
                <label htmlFor="text"><strong>Email</strong>
                  <input type="text" placeholder="Enter Email" name='email' className="form-control rounded-0" onChange={e => { setname(e.target.value) }} />
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong>
                  <input type="password" placeholder="Enter Password" name='password' className="form-control rounded-0" onChange={e => { setpassword(e.target.value) }} />
                </label>
              </div>
              <span className="warning" >{errors}</span>
              <button type="submit" className="btn btn-success w-100 rounded-0 mb-3"> Login</button>
            </form>

          </div>
        </div>
      </main>
    </>

  )

}