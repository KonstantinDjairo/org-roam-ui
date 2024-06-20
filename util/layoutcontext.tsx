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
  onAddFunction: any
}
const LayoutContext = createContext<LayoutContextProps>({
  layout: [], setLayout: null, onAddFunction: null
})

export { LayoutContext }
