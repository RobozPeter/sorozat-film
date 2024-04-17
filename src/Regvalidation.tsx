async function Regvalidation(name:string,email:string,password:string) {
    let error=""
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(name==""){
        error="A felhasználó név nem lehet üres"
    }else
    if(email==""){
        error="Email nem lehet üres"
    }
    else if(!email_pattern.test(email)){
        error="Adj meg egy vlós email címet"
    }else if(password==""){
        error="A jelszó nem lehet üres"
    }
    /*const res=fetch("http://localhost:3000/valname",{
        method: 'POST',
        body: JSON.stringify(name),
        headers: {
        'Content-type': 'application/json'
      }})
    console.log((await res).json)*/
    
    
    
    
    return error
}

export default Regvalidation

