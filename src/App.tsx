import { FC, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";

// css

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//

import { Container } from "react-bootstrap";

// redux


import { useAppDispatch, useAppSelector } from "./types/redux-type";
import { getUserAsync } from "./store/userSlice";


// components

import Auth from "./components/Auth";
import Main from "./components/Main";
import Registration from "./components/Registration";

// firebase

import { authFirebase, dbFirebase, storageFirebase } from "./app/firebaseApp";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

// type

import { CardType } from "./types/type";

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [urlAvatar, setUrlAvatar] = useState<any>('');
  const [emailUser, setEmailUser] = useState<string>('')
  const [auth, setAuth] = useState<CardType>({
    login: "",
    password: "",
    name: "",
    avatar: "",
    tgId: "",
    proffession: "",
    isAdmin: false,
  });


  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getUserAsync());
  }, [auth])


  useEffect(() => {
    uploadFile(auth.avatar)
  }, [auth.avatar])


  const uniqId = selector.length + 1;
  const navigate = useNavigate();


  // upload storage IMG

  const uploadFile = (file: any) => {
    if (!file) {
      return;
    }
    const imageRef = ref(storageFirebase, "userAvatar/" + file.name);
    uploadBytes(imageRef, file).then((snapshot: any) => {
      getDownloadURL(snapshot.ref).then((url: any) => {
        console.log(url)
        setUrlAvatar(url)

      });
    });
  };


  // upload firestore

  const createProfile = async (auth: CardType) => {
    const docRef = await setDoc(doc(dbFirebase, "users", JSON.stringify(uniqId)),
      {
        id: uniqId,
        login: auth.login,
        password: auth.password,
        avatar: urlAvatar,
        name: auth.name,
        profession: auth.proffession,
        isAdmin: auth.isAdmin,
      }
    );

    console.log(docRef)
  };

  // crete user auth

  const createLogin = (login: string, password: string) => {
    createUserWithEmailAndPassword(authFirebase, login, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // auth signin

  const authSignIn = async (login: string, password: string): Promise<any> => {
    signInWithEmailAndPassword(authFirebase, login, password)
      .then((usertCredential : any) => {
        const user = usertCredential.user;
        sessionStorage.setItem('uid', user.uid)
        sessionStorage.setItem('email', user.email)

        navigate('/main')
      })
      .catch((error) => {
        alert("Неправильный логин или пароль");
      });
  };



  // auth signout


  const authSignOut = () => {
    sessionStorage.setItem('uid', '')
    sessionStorage.setItem('email', '')
    navigate('/')
  }





  const createUser = (auth: CardType) => {
    try {
      setTimeout(() => {

        createLogin(auth.login, auth.password)
        createProfile(auth);

          setAuth({
            login: "",
            password: "",
            name: "",
            avatar: "",
            tgId: "",
            proffession: "",
            isAdmin: false,
          });

          navigate("/");

      },3000)


    } catch (error) {
      console.error(error)
    }

  }


  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <Auth login={{ auth, setAuth }} authSign={authSignIn}></Auth>
          }
        ></Route>
        <Route
          path="/main"
          element={<Main authOut={authSignOut}></Main>}
        ></Route>
        <Route
          path="/registration"
          element={
            <Registration
              login={{ auth, setAuth }}
              createNewUser={createUser}
            ></Registration>
          }
        ></Route>
      </Routes>
    </Container>
  );
};

export default App;
