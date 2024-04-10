import { CSSProperties, FC } from 'react'

//


interface MyInputProps {
  type: string
  placeholer?: string
  value?: string
  onChange: (e: any) => void
  style?: CSSProperties
  checked?: boolean
}

const MyInput: FC<MyInputProps> = ({type, placeholer, value, onChange, style, checked}) => {
  return (
    <input type={type} checked={checked} placeholder={placeholer} value={value} onChange={onChange} style={style} required/>
  )
}

export default MyInput
