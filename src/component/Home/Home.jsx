import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {doc,setDoc} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../../firebase";
import { getFirestore } from "firebase/firestore";

const Home = () => {


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const {email,id} = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(!email){
            navigate('/authorization')
        }
    },[])


    const functionDB = async () => {
        try {
            await setDoc(doc(db, "users", `${id}`), {
                dialogs:null,
                displayName:null,
                email:null,
                id:null,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        <div>
            <div>Основная информация и новости</div>
            <button onClick={functionDB} >Сделать запрос</button>
        </div>
    );
};

export default Home;