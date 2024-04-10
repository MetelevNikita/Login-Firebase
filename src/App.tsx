import { FC, useEffect, useState } from 'react'
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

import { authFirebase, dbFirebase, storageFirebase } from './app/firebaseApp'
import { setDoc, doc, addDoc, collection, getDocs } from 'firebase/firestore'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'


// type

import { CardType } from './types/type';


const App: FC = () => {



const [data, setData] = useState<Record<string, any>>([])
const [isAuth, setIsAuth] = useState<boolean>(false)
const [urlAvatar, setUrlAvatar] = useState<string>('')
const [auth, setAuth] = useState<CardType>({
  login: '',
  password: '',
  name: '',
  avatar: urlAvatar,
  tgId: '',
  proffession: '',
  isAdmin: false
})


useEffect(() => {
  getData()
}, [isAuth])




const uniqId = data.length + 1
const navigate = useNavigate()


// get firestore data


const getData = async () => {
  const querySnapshot = await getDocs(collection(dbFirebase, 'users'))
  const data =  querySnapshot.docs.map((doc) => doc.data())
  setData(data)
}





// upload storage IMG


const uploadFile = (file: any) => {
  if(!file){
      return
  }
  const imageRef = ref(storageFirebase, 'userAvatar/' + file.name)
  uploadBytes(imageRef, file).then((snapshot: any) => {
    getDownloadURL(snapshot.ref).then((url: any) => {
      console.log(url)
      setUrlAvatar(JSON.stringify(url))
      console.log(urlAvatar)
    })
  })
}

// upload firestore


  const createUserProfile = async () => {
    const docRef = await setDoc(doc(dbFirebase, 'users', JSON.stringify(uniqId)), {
      id: uniqId,
      login: auth.login,
      password: auth.password,
      avatar: urlAvatar,
      name: auth.name,
      isAdmin: auth.isAdmin,
    })
  }

// crete user auth, storage, firestore

  const createNewUser = (login: string, password: string) => {
    createUserWithEmailAndPassword(authFirebase, login, password).then((userCredential) => {
      const user = userCredential.user
      uploadFile(auth.avatar)
      createUserProfile()

    }).then(() => {
      setAuth({
        login: '',
        password: '',
        name: '',
        avatar: '',
        tgId: '',
        proffession: '',
        isAdmin: false
      })

      navigate('/')
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
  }


  // auth signin

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
