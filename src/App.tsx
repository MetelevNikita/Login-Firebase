import { FC, useState } from 'react'
import { BrowserRouter, Route, Routes, redirect, useNavigate } from 'react-router-dom';

// css

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//

import { Container } from 'react-bootstrap'

// components

import Auth from './components/Auth';
import Main from './components/Main';
import Registration from './components/Registration';


// firebase

import { authFirebase, dbFirebase } from './app/firebaseApp'
import { doc, addDoc, collection } from 'firebase/firestore'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'


// type

import { CardType } from './types/type';


const App: FC = () => {


  const [isAuth, setIsAuth] = useState(false)
  const [auth, setAuth] = useState<CardType>({
    login: '',
    password: '',
    name: '',
    tgId: '',
    proffession: '',
    isAdmin: false
  })


  const navigate = useNavigate()


  const createUserProfile = async (card: CardType) => {

    const docRef = await addDoc(collection(dbFirebase, 'users'), {
      card
    })

    console.log(docRef.id)

  }



  const createNewUser = (login: string, password: string) => {

    createUserWithEmailAndPassword(authFirebase, login, password).then((userCredential) => {
      const user = userCredential.user
      console.log(user)
      createUserProfile(auth)
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
  }


  const authSignIn = async (login: string, password: string) : Promise<any> => {

      signInWithEmailAndPassword(authFirebase, login, password).then((usertCredential) => {
        console.log(usertCredential)
        setIsAuth(true)
        console.log('success')
        navigate('/main')

      }).catch((error) => {
        console.log(error)
        setIsAuth(false)

      })
  }


  console.log(isAuth)





  return (

    <Container>
        <Routes>

          <Route path='/' element={<Auth login={{auth, setAuth}} authSign={authSignIn}></Auth>}></Route>
          <Route path='/main' element={<Main isLogin={{isAuth, setIsAuth}}></Main>}></Route>
          <Route path='/registration' element={<Registration login={{auth, setAuth}} create={createNewUser}></Registration>}></Route>

        </Routes>
    </Container>



  )
}


export default App
