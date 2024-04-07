import { episode } from "./episode"

export type season = Root2[]

export interface Root2 {
  id: number
  episodes: episode[]
}
