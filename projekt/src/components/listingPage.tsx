import React, { useState } from "react";
import { useEffect } from 'react'
import { film } from "./film";
import { sorozat } from "./sorozat";


function Page(){

    const [filmek, setFilm] = useState([] as film)

    useEffect(() => {
      async function load(){
        const response =  await fetch('http://localhost:3000/telefonok')
        const filmek = await response.json() as film;
        setFilm(filmek);
      }
    
      load()
      
    })
    
    
    return(
        <div>

    </div>
)
}

export default Page;