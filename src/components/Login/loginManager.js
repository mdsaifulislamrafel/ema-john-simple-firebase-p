import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

export const initializeLoginFramework = () => {
    if (firebase.getApp.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = (() => {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const { displayName, photoURL, email } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            console.log(result.user)
            return signedInUser;
        }).catch((error) => {
            console.log(error);
            console.log(error.message);
        });
});


export const handleFbSignIn = () => {
    const fbProvider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, fbProvider)
        .then((result) => {
            const user = result.user;
            user.success = true;
            return user;
        })
        .catch((error) => {
            console.log(error);
        });

};


export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth)
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signedOutUser;
        }).catch((error) => {
            // An error happened.
        });
};

export const emailAndPassword = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
};

export const signIn = (email, password) => {
    const auth = getAuth();
   return signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
};

const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        // Profile updated!
        console.log('Profile updated successfully');
    }).catch((error) => {
        // An error occurred
        console.log(error);
    });
}

