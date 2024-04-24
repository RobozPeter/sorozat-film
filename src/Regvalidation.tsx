import { User } from "./user"

async function Regvalidation(name: string, email: string, password: string) {
    let error = ""
    /*    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (name == "") {
        error = "A felhasználó név nem lehet üres"
    } else
        if (email == "") {
            error = "Email nem lehet üres"
        }
        else if (!email_pattern.test(email)) {
            error = "Adj meg egy vlós email címet"
        } else if (password == "") {
            error = "A jelszó nem lehet üres"
        }else{

        const user2 = { ID: 0, email: email, username: name, password: "", filmek: [], sorozat: [] } as User
        const res = await fetch("http://localhost:3000/valname", {
        method: 'POST',
        body: JSON.stringify(user2),
        headers: {
            'Content-type': 'application/json'
        }
    })
    let eredmeny = (await res.json() as unknown as User[])[0]
    if (eredmeny.username == name) {
        error = "A felhasználónév már foglalt"
    } else if (eredmeny.email == email) {
        error = "Az email már regisztrálva van"
    }}
    if (error == "") {
    }*/
    const value: User = {
        ID: 0,
        username:name,
        email:email,
        password:password,
        filmek: [],
        sorozat: []
    }
    await fetch("http://localhost:3000/signup", {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
            'Content-type': 'application/json'
        }
    })
    error="Sikeres felhasználó felvétele"
    return error
}

export default Regvalidation

