import { Film } from "./filmek"
import { Sorozat } from "./sorozat"
export interface User{
    ID: number
    email: string
    username: string
    password: string
    filmek:Film[]
    sorozat: Sorozat[]
}