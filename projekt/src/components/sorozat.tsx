import { season } from "./season"

export type sorozat = Root2[]

export interface Root2 {
  id: number
  title: string
  seasons: season[]
}
