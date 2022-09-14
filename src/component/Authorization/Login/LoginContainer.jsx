import React from 'react';
import Login from "./Login";
import {loginAPI, sendMessagesAPI} from "../../api/authAPI";
import {setUser} from "../../../reduxToolkit/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {doc, getDoc, getFirestore,setDoc, updateDoc } from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../../firebase";

const LoginContainer = () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {emailVerified,email} = useSelector(state => state.user)

    if(emailVerified && email){
        navigate('/home')
    }


    const handleLogin = (email, password) => {
        loginAPI(email,password)
            .then(async ({user}) => {
                if (user.emailVerified === false) {
                    navigate('/mailVerification')
                    sendMessagesAPI()
                } else navigate('/home')
                console.log(user)
                if (user.emailVerified === true) {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken,
                        emailVerified: user.emailVerified
                    }))
//todo отрефакторить эту часть
                    const docRef = doc(db, "users", `${user.uid}`);
                    const docSnap = await getDoc(docRef);
                    if(!docSnap.exists()){
                        setDoc(doc(db, "users", `${user.uid}`), {
                            dialogs:null,
                            displayName:user.displayName,
                            email:user.email,
                            id:user.uid,
                        })
                    }else{
                        const updateProfile = doc(db, "users", `${user.uid}`);
                        await updateDoc(updateProfile, {
                            dialogs:null,
                            displayName:user.displayName,
                            email:user.email,
                            id:user.uid,
                        });
                    }
//todo отрефакторить эту часть
                }
            })
            .catch(console.error)
    }



    return (
        <div>
            <Login handleLogin={handleLogin}/>
        </div>
    );
};

export default LoginContainer;