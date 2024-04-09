import { FC } from'react'

//

import { Col, Row } from 'react-bootstrap'
import MyInput from './ui/MyInput'
import MyButton from './ui/MyButton'

//


interface RegistrationProps {
  login: any
  create: any
}

const Registration: FC<RegistrationProps> = ({ login, create }) => {

  const {auth, setAuth} = login

  return (

    <Row md={12} className='d-flex flex-column'>
      <Col>Registration</Col>

      <Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='email' placeholer='введите email' value={auth.login} onChange={(e) => {setAuth({...auth, login: e.target.value})}}></MyInput></Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='text' placeholer='введите имя' value={auth.name} onChange={(e) => {setAuth({...auth, name: e.target.value})}}></MyInput></Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='text' placeholer='введите пароль' value={auth.password} onChange={(e) => {setAuth({...auth, password: e.target.value})}}></MyInput></Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='text' placeholer='введите id телеграмма' value={auth.tgId} onChange={(e) => {setAuth({...auth, tgId: e.target.value})}}></MyInput></Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='text' placeholer='введите вашу должность' value={auth.profession} onChange={(e) => {setAuth({...auth, profession: e.target.value})}}></MyInput></Col>




          <Col style={{width: '100%', height: '50px'}} md={12} className='d-flex align-items-center'>
            <span style={{marginRight: '10px'}}>должность админа</span>
            <MyInput type='checkbox' placeholer='' value={auth.profession} onChange={(e) => {setAuth({...auth, profession: e.target.value})}}></MyInput>
          </Col>


          <Col><MyButton text='создать' onClick={() => {create(auth.login, auth.password)}}></MyButton></Col>

      </Col>


    </Row>




  )
}

export default Registration
