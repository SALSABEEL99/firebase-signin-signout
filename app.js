// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcKuabhypoX6Z56K05K4lIADDhO3_GJ64",
  authDomain: "login-logout-project-fda60.firebaseapp.com",
  projectId: "login-logout-project-fda60",
  storageBucket: "login-logout-project-fda60.appspot.com",
  messagingSenderId: "217523785208",
  appId: "1:217523785208:web:d952094cc19dd392ee1a0d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const signup_btn = document.getElementById("signup_btn");

const signin_email = document.getElementById("signin_email");
const signin_password = document.getElementById("signin_password");
const signin_btn = document.getElementById("signin_btn");

const user_email = document.getElementById("user_email");
const logout_btn = document.getElementById("logout_btn");

const auth_container = document.getElementById("auth_container");
const user_container = document.getElementById("user_container");

signup_btn.addEventListener("click", createUserAccount);
signin_btn.addEventListener("click", signIn);
logout_btn.addEventListener("click", logout);

//user state
onAuthStateChanged(auth, (user) => {
  if (user) {
    //console.log('user login');
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    auth_container.style.display = "none";
    user_container.style.display = "block";
    user_email.innerText = user.email;
    // ...
  } else {
    auth_container.style.display = "block";
    user_container.style.display = "none";
    //console.log('user not login');
    // User is signed out
    // ...
  }
});
//user createaccount
function createUserAccount() {
  event.preventDefault;
  createUserWithEmailAndPassword(
    auth,
    signup_email.value,
    signup_password.value
  )
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("user=>", user);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        title: "Sorry",
        text: "this email is already use!",
        icon: "error",
      });
      // ..
    });
}
//user sign in
function signIn() {
  //console.log(signin_email.value );
  //console.log(signin_password.value);
  signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
    .then((userCredential) => {
      // Signed in
      Swal.fire({
        title: "Successfully",
        text: "You login in to your account ",
        icon: "success",
      });
      const user = userCredential.user;
      console.log("user");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        title: "Error",
        text: "Please check your email&password ",
        icon: "error",
      });
    });
}
//user logout/
function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
