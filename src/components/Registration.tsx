import { FC } from'react'
import { useNavigate } from 'react-router-dom'

//

import { Col, Row } from 'react-bootstrap'
import MyInput from './ui/MyInput'
import MyButton from './ui/MyButton'

//


interface RegistrationProps {
  login: any
  createNewUser: (e: any) => void
}

const Registration: FC<RegistrationProps> = ({ login, createNewUser }) => {

  const {auth, setAuth} = login
  const navigate = useNavigate()

  return (

    <Row md={12} className='d-flex flex-column'>
      <Col>Registration</Col>


      <Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='email' placeholer='введите email' value={auth.login} onChange={(e) => {setAuth({...auth, login: e.target.value})}}></MyInput></Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='text' placeholer='введите имя' value={auth.name} onChange={(e) => {setAuth({...auth, name: e.target.value})}}></MyInput></Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='text' placeholer='введите пароль' value={auth.password} onChange={(e) => {setAuth({...auth, password: e.target.value})}}></MyInput></Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='text' placeholer='введите id телеграмма' value={auth.tgId} onChange={(e) => {setAuth({...auth, tgId: e.target.value})}}></MyInput></Col>

          <Col md={12}><MyInput style={{width: '100%', height: '50px'}} type='text' placeholer='введите вашу должность' value={auth.proffession} onChange={(e) => {setAuth({...auth, proffession: e.target.value})}}></MyInput></Col>

          <Col className='d-flex align-items-center mt-3 mb-3'>


          <Col md={6} className='d-flex align-items-center justify-content-center'>
            <span style={{marginRight: '10px'}}>должность админа</span>
            <MyInput type='checkbox' checked={auth.isAdmin} onChange={(e) => {setAuth({...auth, isAdmin: e.target.checked})}}></MyInput>
          </Col>

          <Col md={6} className='d-flex align-items-center justify-content-center'>
              <span style={{marginRight: '10px'}}>Загрузите изображение</span>
              <MyInput type='file' onChange={(e) => {setAuth({...auth, avatar: e.target.files[0]})}}></MyInput>
          </Col>

          </Col>



          <Col md={4} className='d-flex flex-row'>
              <Col><MyButton style={{width: '100%', height: '50px', border: 'none',}} text='создать' onClick={() => {createNewUser(auth)}}></MyButton></Col>
              <Col><MyButton style={{width: '100%', height: '50px', border: 'none'}} text='назад' onClick={() => {navigate('/')}}></MyButton></Col>
          </Col>



      </Col>


    </Row>




  )
}

export default Registration
