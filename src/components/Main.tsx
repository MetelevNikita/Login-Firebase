import { FC, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

// redux

import { useAppDispatch, useAppSelector } from "../types/redux-type"
import { getUserAsync } from "../store/userSlice"

//

import { Col, Row } from "react-bootstrap"


// components

import MyButton from "./ui/MyButton"

//

interface MainProps {
  authOut: any
}



const Main: FC<MainProps> = ({ authOut }) => {

  const dispatchh = useAppDispatch();
  const selector = useAppSelector(state => state.user.users)



  const navigate = useNavigate()
  const uid = sessionStorage.getItem('uid')
  const email = sessionStorage.getItem('email')

  const selectedUser = selector.filter((item) => {return item.login === email})
  console.log(selectedUser[0])



  useEffect(() => {
    dispatchh(getUserAsync())
  }, [])


  useEffect(() => {
    if(!uid) {
       navigate("/")
    }
  } , [])











  return (

    <Row>
      <Col>


        <h2>main</h2>


        <MyButton text="выйти" onClick={() => {authOut()}}></MyButton>


      </Col>
    </Row>

  )
}

export default Main
