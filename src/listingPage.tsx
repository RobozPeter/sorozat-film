import { useState } from "react";
import { useEffect } from 'react'
import { Film } from "./filmek.tsx";
import { Sorozat } from "./sorozat.tsx";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./user.tsx";



function Page() {
    const [sorozatok, setSorozat] = useState([] as Sorozat[])
    const [filmek, setFilm] = useState([] as Film[])
    let navigate = useNavigate()
    let user: User
    useEffect(() => {
        async function load() {
            let respond = await fetch("http://localhost:3000/currentuser")
            user = await respond.json() as User
            setFilm(user.filmek)
            setSorozat(user.sorozat);

        }
        load()
    }, [])
    async function logout() {
        const user2 = { ID: 0, email: "", username: "", password: "", filmek: [], sorozat: [] } as User
        await fetch("http://localhost:3000/currentuser", {
            method: 'POST',
            body: JSON.stringify(user2),
            headers: {
                'Content-type': 'application/json'
            }
        })
        navigate("/")
    }


    return (
        <div>
            <nav>
                <ul className="nav-list">
                    <li className="active">
                        <Link to="/listingPage" className="btn d-block text-decoration-none text-white" aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link to="/uj" className="btn d-block text-decoration-none text-white">Új felvétele</Link>
                    </li>
                    <li>
                        <button onClick={logout} >Kijelentkezés</button>
                    </li>

                </ul>
            </nav>
            <div>
            <h1>Filmek:</h1>
                {
                    //filmek.map((Film, index) => (<tr key={index}> <td>{Film.Cim}</td> </tr>))
                    filmek.map(film => (
                    <tr> <td>{film.title}</td> </tr>
                    ))

                }
            </div>
            <div>

                <h1>Sorozatok:</h1>

                {
                    sorozatok.map((sorozat, index) => (
                        <div>
                            <h1>{sorozat.title}</h1>

                            <table className="table" key={index}>

                                <tbody>
                                    
                                        {sorozat.resz.map((epizod) => (
                                            <tr>

                                            <td className="text-white">{epizod.epizodszam}</td>
                                            <td className="text-white">{epizod.cim}</td>

                                            </tr>
                                        ))}
                                     
                                </tbody></table>
                        </div>
                    )
                    )
                }

            </div>

        </div>
    )
}

export default Page;