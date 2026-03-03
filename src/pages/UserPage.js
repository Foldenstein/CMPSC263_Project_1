import { useState, useEffect } from 'react';
import './UserPage.css'
import { auth, db} from './firebase.js'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import {doc, setDoc, getDoc} from 'firebase/firestore'

const LoginSignUp = () => {
    // keep track of current webpage
    const [action, setAction] = useState('Login');

    // keep track of login info textbox
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // keep track if user is login or not
    const [user, setUser] = useState(null);
    const [dbusername, setDbusername] = useState('');

    const handleAuth = async () => {
        try {
            // check if the Sign up button was clicked
            if (action === "Sign Up") {
                // Create the user in Firebase Auth
                const res = await createUserWithEmailAndPassword(auth, email, password);
                // Save the info to Firestore linked by UID (unique)
                await setDoc(doc(db, "userdb", res.user.uid), {
                    username: username,
                    email: email,
                    uid: res.user.uid
                });
            } else {
                // Login existing user
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            //tell user the error usually email or password
            alert(error.message);
        }
    };

    // use hook useEffect to check db changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                //make use of db to reciever user info
                const userDoc = await getDoc(doc(db, "userdb", currentUser.uid));
                if (userDoc.exists()) {
                    setDbusername(userDoc.data().username);
                }
            }
        });
        return () => unsubscribe();
    }, []); 

    if (user) {
        return (
            <div>
                <h1>Profile</h1>
                <p><b>Username: </b>{dbusername}</p>
                <p><b>Email: </b>{user.email}</p>
                <button onClick={() => signOut(auth)}>Sign Out</button>
            </div>
        );
    }
    return (
        <div className="containers">
            <div className='header'>
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==='Login'?<div></div>:<div className="input">
                    <img src='./picture/usericon.png' alt='user' />
                    <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                </div>}
                <div className="input">
                    <img src='./picture/emailicon.png' alt='email' />
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input">
                    <img src='./picture/passwordicon.png' alt='password' />
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className='submit-container'>
                <div className={action==='Login'?'submit gray':'submit'} onClick={()=>action ==='Sign Up' ? handleAuth() : setAction('Sign Up')}>Sign Up</div>
                <div className={action==='Sign Up'?'submit gray':'submit'} onClick={()=>action === 'Login' ? handleAuth() : setAction('Login')}>Login</div>                
            </div>
        </div>
    );
};

export default LoginSignUp;