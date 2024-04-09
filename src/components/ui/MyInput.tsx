import { CSSProperties, FC } from 'react'

//


interface MyInputProps {
  type: string
  placeholer?: string
  value: string
  onChange: (e: any) => void
  style?: CSSProperties
}

const MyInput: FC<MyInputProps> = ({type, placeholer, value, onChange, style}) => {
  return (
    <input type={type} placeholder={placeholer} value={value} onChange={onChange} style={style} required/>
  )
}

export default MyInput
