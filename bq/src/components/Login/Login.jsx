import React, {useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth, firestore } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import SweetAlert from "sweetalert2";
import LoginForm from "./LoginForm";
import { login } from "../../lib/firebase";
import Footer from "../Footer/Footer";
import logo from "../../assets/banner.png";
import hamburger from "../../assets/hamburgertwo.png";
const Login = () => {
  const navigate = useNavigate();

  const getRol = async (uid) => {
    const docRef = doc(firestore, `users/${uid}`);
    const docCipher = await getDoc(docRef);
    const infoFinish = docCipher.data().rol;
    return infoFinish;
  };
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        console.log("no user logged in");
      }else{
        getRol(user.uid).then((userRol)=>{
          userRol === "chef"
          ? navigate("/KitchenRoom")
          : userRol === "waiter"
          ? navigate("/WaiterProfile")
          : userRol === "admin" ? navigate("/AdminProfile") : navigate("/") ;
        
      })
      }
    });
    // eslint-disable-next-line
  }, []);
  
  const handleSubmit = async (email, password) => {
    try {
      console.log("clicking");
      const signIn = await login(email, password);

      const user= auth.currentUser;
      if(user){console.log(user)}
     getRol(user.uid).then((userRol)=>{
      userRol === "chef"
      ? navigate("/KitchenRoom")
      : userRol === "waiter"
      ? navigate("/WaiterProfile")
      : userRol === "admin" ? navigate("/AdminProfile") : navigate("/") ;
    console.log("im signIn", signIn);
      
  })
      // const user = await fetch(`/users/${email}`).then(resp => resp.json())
      // localStorage.setItem('user', user)
    } catch (error) {
      console.error(error);
      new SweetAlert({
        title: "Error",
        text: error.message,
        icon: "error",
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Ok",
        cancelButtonColor: "#FF4848",
        background: "#FAEEE0",
      });
    }
  };

  return (
    <div className="container__Login">
      <header className="logo">
        <img id="img-logo" src={logo} alt="logoBQ" />
      </header>
      <section className="column">
        <img className="img__hamburger" src={hamburger} alt="logoBQ" />
      </section>
      <section className="column">
        <div className="login__form">
          <LoginForm handleSubmit={handleSubmit} />
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Login;