import { FC } from 'react'

//

import { Col, Row } from 'react-bootstrap'

// bootstrap

import { Link, useNavigate } from 'react-router-dom'

// components

import MyInput from './ui/MyInput'
import MyButton from './ui/MyButton'


//

interface AuthProps {
  login: any
  authSign: (login: string, password: string) => void
}

const Auth: FC<AuthProps> = ({ login, authSign }) => {


  const navigate = useNavigate()
  const {auth, setAuth} = login



  return (


    <Row md={12} className='d-flex flex-column justify-content-center align-items-center' style={{height: '100%'}}>


      <Col className='d-flex flex-column justify-content-center align-items-center'><h1>LOGO</h1></Col>

      <Col md={12} className='d-flex flex-column justify-content-center align-items-center'>
          <Col md={6}><MyInput style={{width: '100%', height: '50px'}} type='text' placeholer='login' value={auth.login} onChange={(e) => {setAuth({...auth, login: e.target.value})}}/></Col>
          <Col md={6}><MyInput style={{width: '100%', height: '50px'}} type='password' placeholer='password' value={auth.password} onChange={(e) => {setAuth({...auth, password: e.target.value})}}/></Col>
      </Col>



      <Col md={12} className='d-flex flex-row justify-content-center align-items-center'>
          <Col className='d-flex flex-column justify-content-center align-items-center' md={3}><MyButton style={{width: '100%', height: '50px'}} text='войти' onClick={() => {authSign(auth.login, auth.password)}}></MyButton></Col>
          <Col className='d-flex flex-column justify-content-center align-items-center' md={3}><MyButton style={{width: '100%', height: '50px'}} text='регистрация' onClick={() => {navigate('/registration')}}></MyButton></Col>
      </Col>


    </Row>

  )
}

export default Auth
