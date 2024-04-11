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

// components

import Auth from "./components/Auth";
import Main from "./components/Main";
import Registration from "./components/Registration";

// firebase

import { authFirebase, dbFirebase, storageFirebase } from "./app/firebaseApp";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

// type

import { CardType } from "./types/type";

const App: FC = () => {
  const [data, setData] = useState<Record<string, any>>([]);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [urlAvatar, setUrlAvatar] = useState<any>('');
  const [auth, setAuth] = useState<CardType>({
    login: "",
    password: "",
    name: "",
    avatar: "",
    tgId: "",
    proffession: "",
    isAdmin: false,
  });


  useEffect(() => {
    getData();
  }, [isAuth]);

  useEffect(() => {
    uploadFile(auth.avatar)
  }, [auth.avatar])


  const uniqId = data.length + 1;
  const navigate = useNavigate();

  // get firestore data

  const getData = async () => {
    const querySnapshot = await getDocs(collection(dbFirebase, "users"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
  };



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
      .then((usertCredential) => {
        console.log(usertCredential);
        setIsAuth(true);
        navigate("/main");
      })
      .catch((error) => {
        alert("Неправильный логин или пароль");
        setIsAuth(false);
      });
  };




  const createUser = (auth: CardType) => {
    try {
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
          element={<Main isLogin={{ isAuth, setIsAuth }}></Main>}
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
