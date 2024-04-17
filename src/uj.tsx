import { FormEvent,useEffect,useState } from "react";
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
    let cimek=[];
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        cimek[parseInt(event.target.name)]=event.target.value
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
    let navigate = useNavigate()
    const [cimek,setcimek]=useState([] as string[])
    let user={ ID: 0, email: "", username: "", password: "", filmek: [], sorozat: [] } as User

    async function load() {
        let respond = await fetch("http://localhost:3000/currentuser")
        user=await respond.json() as User
        
    }
    useEffect(()=>{
        load()
    },[])

    const handleToggle = () => {
        setHelp(prevHelp => !prevHelp);
    };

    const handleChange = (event: { target: { value: string }; }) => {
        let x=[]
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
        let igen={ ID: 0, email: "", username: "", password: "", filmek: [], sorozat: [] }
        await load()
        await fetch("http://localhost:3000/updateuser",{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        })
        
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
                    <div>
                    <p className="d-inline">Sorozat</p>
                    </div>
                    <div className="form-check form-switch form-check-inline d-inline">
                    <input className="form-check-input" onChange={handleToggle} type="checkbox" checked={help} role="switch" />
                    <label>Film</label>
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
                                <button>input</button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <form onSubmit={(res) => addSorozat(res)}>

                                <p>Sorozat</p>
                                <label htmlFor="cim"> <p>Cím</p>
                                    <input type="text" placeholder="Sorozat címe" name="cim" value={cim} onChange={e => { setcim(e.currentTarget.value) }} />
                                </label>
                                <p>1.évad</p>
                                <label> <p>Részek száma száma</p>
                                    <input type="number" value={cimek.length} onChange={handleChange} />
                                </label>

                                <Inputs value={cimek} onCimChange={setcimek} />
                                <button id="felvevo">Felvesz</button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
export default Homepage