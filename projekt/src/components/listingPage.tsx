import React, { useState } from "react";
import { useEffect } from 'react'
import { film } from "./film";
import { sorozat } from "./sorozat";


function Page() {

    const [filmek, setFilm] = useState([] as film)

    useEffect(() => {
        async function load() {
            const response = await fetch('http://localhost:3000/telefonok')
            const filmek = await response.json() as film;
            setFilm(filmek);
        }

        load()

    })

    const [sorozatok, setSorozat] = useState([] as sorozat)

    useEffect(() => {
        async function load() {
            const response = await fetch('http://localhost:3000/telefonok')
            const sorozatok = await response.json() as sorozat;
            setFilm(sorozatok);
        }

        load()

    })


    return (
        <div>

            <div>
                {
                    filmek.map((Film, index) => (<tr key={index}> <td>{Film.id}</td>  <td>{Film.title}</td> </tr>))


                }
            </div>
            <div>
                {
                    sorozatok.map((Sorozat, index) => (

                        <tr key={index}>
                            <td>{Sorozat.id}</td>
                            <td>{Sorozat.title}</td>
                            <td>
                                <ul>{Sorozat.resz.map((Vmi, i) =>
                                    (<li>{Vmi.id} {Vmi.title}</li>)

                                )}
                                </ul>
                            </td>
                        </tr>)

                    )}
            </div>

        </div>
    )
}

export default Page;