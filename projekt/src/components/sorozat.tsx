import { resz } from "./resz"


export type sorozat = Root2[]

export interface Root2 {
  id: number
  title: string
  resz: resz[]
}
