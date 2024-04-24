import { FormEvent, useEffect, useState } from "react";
import "./home.css"
import { Link, useNavigate } from "react-router-dom";
import { Film } from "./filmek";
import { User } from "./user";
import { Sorozat } from "./sorozat";
import { Epizod } from "./epizod";


interface InputProps {
    value: string[],
    onCimChange: (cimek: string[]) => void;
}

function Inputs({ value, onCimChange }: InputProps) {
    let cimek = [];
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        cimek[parseInt(event.target.name)] = event.target.value
        onCimChange(cimek)
    };

    const inputElements: JSX.Element[] = [];

    for (let index = 0; index < value.length; index++) {
        cimek.push(value[index])
        inputElements.push(
            <label key={index} >{index + 1} rész:
                <input type="text" name={index + ""} onChange={(e) => handleInputChange(e)} /></label>
        );
    }
    return <div>{inputElements}</div>;
}

function Homepage() {

    const [help, setHelp] = useState(false);
    const [cim, setcim] = useState("")
    const[val,setval]=useState(0)
    let navigate = useNavigate()
    const [cimek, setcimek] = useState([] as string[])
    let user = { ID: 0, email: "", username: "", password: "", filmek: [], sorozat: [] } as User

    async function load() {
        let respond = await fetch("http://localhost:3000/currentuser")
        user = await respond.json() as User

    }
    useEffect(() => {
        load()
    }, [])

    const handleToggle = () => {
        setHelp(prevHelp => !prevHelp);
    };

    const handleChange = (event: { target: { value: string }; }) => {
        let x = []
        setval(parseInt(event.target.value))
        for (let index = 0; index < parseInt(event.target.value); index++) {
            x.push("")
        }
        setcimek(x)
    };



    async function addSorozat(event: FormEvent) {
        event.preventDefault();
        const reszek = [] as Epizod[]
        for (let index = 0; index < cimek.length; index++) {
            const element = cimek[index];
            reszek.push({ epizodszam: index + 1, cim: element, megtekintett: false } as Epizod)
        }
        const sorozat = { title: cim, resz: reszek } as unknown as Sorozat
        await load()
        user.sorozat.push(sorozat)
        setcim("")
        await fetch("http://localhost:3000/currentusersorozat", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        })
        await load()
    }
    async function addFilm(event: FormEvent<HTMLFormElement>) {
        await load()
        event.preventDefault();
        const film = { title: cim, Hosszperc: 0 } as Film
        user.filmek.push(film)
        setcim("")
        await fetch("http://localhost:3000/currentuserfilm", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        })
        await load()
    }

    async function logout() {
        let igen = { ID: 0, email: "", username: "", password: "", filmek: [], sorozat: [] }
        await load()
        let res=await fetch("http://localhost:3000/updateuser", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        })
        console.log(res)

        await fetch("http://localhost:3000/currentuser", {
            method: 'POST',
            body: JSON.stringify(igen),
            headers: {
                'Content-type': 'application/json'
            }
        })
        navigate("/")
    }

    return (
        <>
            <nav>
                <ul className="nav-list">
                    <li >
                        <Link to="/listingPage" className="btn d-block text-decoration-none text-white">Home</Link>
                    </li>
                    <li className="active">
                        <Link to="/uj" className="btn d-block text-decoration-none text-white" aria-current="page" >Új felvétele</Link>
                    </li>
                    <li>
                        <button onClick={logout} >Kijelentkezés</button>
                    </li>

                </ul>
            </nav>
            <main>
                <div>
                    <div className="container">
                        <div className="row" >
                            <div className="col text-center" >

                                <label className="align-middle">Sorozat</label>
                            </div>
                            <div className="col" >

                                <div className=" form-switch">
                                    <input className="form-check-input w-100" onChange={handleToggle} type="checkbox" checked={help} role="switch" />
                                </div>
                            </div>
                            <div className="col text-center" >

                                <label className="align-middle text-center" >Film</label>
                            </div>
                        </div>

                    </div>
                    {help ? (
                        <div>
                            <label>

                            </label>
                            <form onSubmit={(res) => addFilm(res)}>
                                <p>Film</p>
                                <label htmlFor="cim"> <p>Cím</p>
                                    <input type="text" placeholder="Film címe" name="cim" value={cim} onChange={e => { setcim(e.currentTarget.value) }} />
                                </label>
                                <br />
                                <button className="my-3">Felvesz</button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <form onSubmit={(res) => addSorozat(res)}>

                                <p>Sorozat</p>
                                <label htmlFor="cim"> <p>Cím</p>
                                    <input type="text" placeholder="Sorozat címe" name="cim" value={cim} onChange={e => { setcim(e.currentTarget.value) }} />
                                </label>
                                <br />
                                <label> <p>Részek száma:</p>
                                    <input type="number" value={val} onChange={handleChange}  />
                                </label>

                                <Inputs value={cimek} onCimChange={setcimek} />
                                <button className="my-3">Felvesz</button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
export default Homepage