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
  login: any
}



const Main: FC<MainProps> = ({ authOut, login }) => {

  const dispatchh = useAppDispatch();
  const selector = useAppSelector(state => state.user.users)


  const navigate = useNavigate()
  const uid = sessionStorage.getItem('uid')
  const {auth, setAuth} = login


  const selectedUser = selector.filter((item) => {return item.login === auth.login})
  console.log(selectedUser)


  useEffect(() => {
    dispatchh(getUserAsync())
  }, [auth])


  useEffect(() => {
    if(!uid) {
       navigate("/")
    }
  } , [])



  console.log(selector)









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
