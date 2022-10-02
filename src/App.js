import React from "react"
import cl from './App.module.css'
import {Route, Routes} from "react-router-dom";
import HomeContainer from "./component/Home/HomeContainer";
import Header from "./component/Header/Header";
import AuthorizationContainer from "./component/Authorization/AuthorizationContainer";
import EmailVerificationContainer from "./component/EmailVerification/EmailVerificationContainer";
import NavbarContainer from "./component/Navbar/NavbarContainer";
import DialogsContainer from "./component/Dialogs/DialogsContainer";


const App = () =>  {



  return (
    <div className={cl.appContainer}>
        <Header/>
        <NavbarContainer/>
      <div className={cl.appWrapperContent}>
          <Routes>
              <Route path={'/home'} element={<HomeContainer/>} />
              <Route path={'/authorization'} element={<AuthorizationContainer/>} />
              <Route path={'/mailVerification'} element={<EmailVerificationContainer/>} />
              <Route path={'/dialogs/:id'} element={<DialogsContainer/>} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
