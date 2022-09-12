import React from "react"
import cl from './App.module.css'
import {Route, Routes} from "react-router-dom";
import HomeContainer from "./component/Home/HomeContainer";
import Header from "./component/Header/Header";
import AuthorizationContainer from "./component/Authorization/AuthorizationContainer";
import EmailVerificationContainer from "./component/EmailVerification/EmailVerificationContainer";
import NavbarContainer from "./component/Navbar/NavbarContainer";


function App() {
  return (
    <div className={cl.appContainer}>
        <Header/>
        <NavbarContainer/>
      <div className={cl.appWrapperContent}>
          <Routes>
              <Route path={'/home'} element={<HomeContainer/>} />
              <Route path={'/authorization'} element={<AuthorizationContainer/>} />
              <Route path={'/mailVerification'} element={<EmailVerificationContainer/>} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
