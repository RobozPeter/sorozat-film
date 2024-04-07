import { Film } from "./fimek"
import { Sorozat } from "./sorozat"
export interface User{
    id: number
    email: string
    username: string
    password: string
    filmek:Film[]
    sorozatok: Sorozat[]
}