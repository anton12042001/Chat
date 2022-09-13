import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../../firebase";
import { getFirestore } from "firebase/firestore";

const Home = () => {


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const {email} = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(!email){
            navigate('/authorization')
        }
    },[])


    const functionDB = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
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