import { FC, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

//


import { Col, Row } from "react-bootstrap"
import MyButton from "./ui/MyButton"

interface MainProps {
  isLogin: any
}



const Main: FC<MainProps> = ({ isLogin }) => {

  const navigate = useNavigate()
  const {isAuth, setIsAuth} = isLogin


  useEffect(() => {
    if(!isAuth) {
       navigate("/")
    }
  } , [])



  return (

    <Row>
      <Col>


        <h2>main</h2>


      </Col>
    </Row>

  )
}

export default Main
