import React from "react";
import Footer from "../Footer/Footer";
import { NavBarAdministrator } from '../NavBar.jsx/NavBarAdministrator';
import {ProfileCrud} from '../Administrator/ProfileCrud'
import { UserRegister } from "./UserRegister";

export const AdminProfile = () => {
  return (
    <div>
    <div className="content__admin__profile">
      <NavBarAdministrator />
      <div className="container__crud">
        <section >
        {/* className="column__container__register" */}
        <UserRegister/>
        </section>
        <section className="column__container__crud">
        <ProfileCrud />
        </section>
      </div>
    </div>
    <footer>
      <Footer />
    </footer>
  </div>
  );
};
