import { createContext } from 'react'

export type LayoutItem = {
  i: string,
  x: number,
  y: number,
  w: number,
  h: number
}
export type Layout = LayoutItem[]

export interface LayoutContextProps {
  layout: Layout
  setLayout: any
}
const LayoutContext = createContext<LayoutContextProps>({
  layout: [], setLayout: null
})

export { LayoutContext }
