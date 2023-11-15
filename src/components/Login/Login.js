// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { FacebookAuthProvider } from "firebase/auth";
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { emailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signIn } from "./loginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      });
  };

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect) {
      history.replace(from);
    }
  }


  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHashNumber = /\d/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHashNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      emailAndPassword(user.email, user.password, user.name)
        .then(res => {
          handleResponse(res, true);
        })
    }

    if (!newUser && user.email && user.password) {
      signIn(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    event.preventDefault();
  };



  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={googleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign in using Facebook</button>


      {
        user.isSignedIn && <div>
          <h1>Welcome {user.name}</h1>
          <h2>Your email address {user.email}</h2>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name='name' type="text" onBlur={handleBlur} placeholder='Your Name' required />}
        <br />
        <input type="text" name='email' onBlur={handleBlur} placeholder='Your Email Address' required />
        <br />
        <input type="password" name="password" id="" onBlur={handleBlur} placeholder='Enter Your Password' required />
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>

      {
        user.error && <p style={{ color: 'red' }}>The email address is already in use by another account</p>
      }
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} Successfully</p>
      }
    </div>
  );
}

export default Login;
