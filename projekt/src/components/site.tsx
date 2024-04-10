import React, { useState,FormEvent, useRef } from "react";
import "./index.css";

function Inputs({ value, newreszekref }) {
    const [inputs, setInputs] = useState([] as Int32List[]);
    
    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs.push(event.target.value);
        setInputs(newInputs);
        const allValues = newInputs.join(", ");
        newreszekref.current.value = allValues;
    };
    
    const inputElements : JSX.Element[] = [];
    
    for (let index = 0; index < value; index++) {
        inputElements.push(
            <div key={index}>
                <label>{index+1}</label>
                <input type="text" id={index+""} onChange={(e) => handleInputChange(index, e)} />
            </div>
        );
    }
    
    return <div>{inputElements}</div>;
}

function NewElement() {
    const [help, setHelp] = useState(false);
    const [value, setValue] = useState(0);
    
    const handleToggle = () => {
        setHelp(prevHelp => !prevHelp);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };
/*
    const EvadPlusPlus = () => {
        return (
            <div>
                <p>1.évad</p>
                <label> <p>Részek száma száma</p>
                <input type="number" value={value} onChange={handleChange} />
                </label>
                <Inputs value={value} />
                </div>
            );
        }
        */

       const url = "http://localhost:3000/sorozat"
const newcimref = useRef<HTMLInputElement>(null)
const newreszekref = useRef<HTMLInputElement>(null)


async function addSorozat(event:FormEvent) {
    event.preventDefault();
    const cim = newcimref.current?.value;
    const reszek = newreszekref  ///newreszekref.current?.value;
    const sorozat = {title:cim,resz:reszek}

    
    const res = await  fetch(url, {
        method: "POST",
        body: JSON.stringify(sorozat),
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    if (res.ok) {
        console.log("New Item successfully updated!");
        newcimref.current!.value = "";
        newreszekref.current!.value = "";
    }
}

const url2 = "http://localhost:3000/film"
const newtitleref = useRef<HTMLInputElement>(null)


async function addFilm(event:FormEvent) {
    event.preventDefault();
    const title = newtitleref.current?.value;
    const film = {title:title}

    
    const res = await  fetch(url2, {
        method: "POST",
        body: JSON.stringify(film),
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    if (res.ok) {
        console.log("New Item successfully updated!");
        newtitleref.current!.value = "";
        
    }
}
    
    return (
        <div>
            {help ? (
                <div>
                    <label className="switch">
                        <input onChange={handleToggle} type="checkbox" checked={help} />
                        <span className="slider round"></span>
                    </label>
                    <form onSubmit={(res)=>addFilm(res)}>
                    <p>Film</p>
                    <label htmlFor="cim"> <p>Cím</p>
                        <input type="text" placeholder="Film címe" name="cim" />

                    </label>
                    <button>input</button>
                    </form>
                </div>
            ) : (
                <div>
                    <label className="switch">
                        <input onChange={handleToggle} type="checkbox" checked={help} />
                        <span className="slider round"></span>
                    </label>
                    <form onSubmit={(res)=>addSorozat(res)}>

                    <p>Sorozat</p>
                    <label htmlFor="cim"> <p>Cím</p>
                        <input type="text" placeholder="Sorozat címe" name="cim" />
                    </label>
                    <p>1.évad</p>
                    <label> <p>Részek száma száma</p>
                        <input type="number" value={value} onChange={handleChange} />
                    </label>
                    <Inputs value={value} newreszekref={newreszekref}/>
                    <button id="felvevo">Felvesz</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default NewElement;
