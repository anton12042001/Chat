import React from 'react';
import cl from './Header.module.css'
import CurrentUserContainer from "./CurrentUser/CurrentUserContainer";

const Header = () => {
    return (
        <div className={cl.headerBlock} >
           <CurrentUserContainer/>
        </div>
    );
};

export default Header;