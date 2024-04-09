import React, { useState } from "react";
import "./index.css";

function NewElement() {

    function Inputs({ value }) {

        const [inputs, setInputs] = useState([] as Int32List[]);

        const handleInputChange = (index, event) => {
            const newInputs = [...inputs];
            newInputs.push(event.target.value);
            setInputs(newInputs);
        };

        const inputElements: JSX.Element[] = [];
    
        for (let index = 0; index < value; index++) {
            inputElements.push(
                <div key={index}>
                    <label>{index+1}</label>
                    <input type="text" onChange={(e) => handleInputChange(index, e)} />
                </div>
            );
        }

        return <div>{inputElements}</div>;
    }

    const [help, setHelp] = useState(false);

    const handleToggle = () => {
        setHelp(prevHelp => !prevHelp);
    };
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    function EvadPlusPlus(){
        return <div>

            <p>1.évad</p>
            <label> <p>Részek száma száma</p>
                <input type="number" value={value} onChange={handleChange} />
            </label>
            <Inputs value={value} />
        </div>

    }
    
    return (
    <div>

        {help ? (
            <div>
                <label className="switch">
                    <input onChange={handleToggle} type="checkbox" checked={help} />
                    <span className="slider round"></span>
                </label>
                <p>Film</p>
                <label htmlFor="cim"> <p>Cím</p>
                    <input type="text" placeholder="Film címe" name="cim" />
                </label>
            </div>
        ) : (
            <div>
                <label className="switch">
                    <input onChange={handleToggle} type="checkbox" checked={help} />
                    <span className="slider round"></span>
                </label>
                <p>Sorozat</p>
                <label htmlFor="cim"> <p>Cím</p>
                    <input type="text" placeholder="Sorozat címe" name="cim" />

                </label>
                <p>1.évad</p>
                <label> <p>Részek száma száma</p>
                    <input type="number" value={value} onChange={handleChange} />
                </label>
                <Inputs value={value} />
                <button onClick={()=>EvadPlusPlus()}>Új évad</button>
            </div>
        )}
    </div>
);

}

export default NewElement;
