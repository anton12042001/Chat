import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import {getDatabase, ref, set, child, get} from "firebase/database";
import {useSelector} from "react-redux";

const NavbarContainer = () => {
    const {id,email} = useSelector(state => state.user)

    // useEffect(() => {
    //     const dbRef = ref(getDatabase());
    //     get(child(dbRef, `dialogs/`))
    //         .then((snapshot) => {
    //         if (snapshot.exists()) {
    //             console.log(snapshot.val());
    //         } else {
    //             console.log("No data available");
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // },[])


//todo разобраться что тут происходит
    const createNewDialogs = ({dialogsName}) => {
        const db = getDatabase();
        set(ref(db, `dialogs/${dialogsName}`), {
            dialogsName: dialogsName,
            admin: id,
            users: {
                id
            }
        });
    }


    return (
        <div>
            <Navbar createNewDialogs={createNewDialogs} />
        </div>
    );
};

export default NavbarContainer;