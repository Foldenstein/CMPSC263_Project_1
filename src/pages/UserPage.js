import { useState } from 'react';
import './UserPage.css'

const LoginSignUp = () => {

    const [action, setAction] = useState('Login');

    return (
        <div className="containers">
            <div className='header'>
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==='Login'?<div></div>:<div className="input">
                    <img src='./picture/usericon.png' alt='user' />
                    <input type="text" placeholder='Username'/>
                </div>}
                <div className="input">
                    <img src='./picture/emailicon.png' alt='email' />
                    <input type="email" placeholder='Email'/>
                </div>
                <div className="input">
                    <img src='./picture/passwordicon.png' alt='password' />
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
            {action==='Sign Up'?<div></div>:<div className='forgot-password'>Lost Password? <span>Click Here</span></div>}
            <div className='submit-container'>
                <div className={action==='Login'?'submit gray':'submit'} onClick={()=>{setAction('Sign Up')}}>Sign Up</div>
                <div className={action==='Sign Up'?'submit gray':'submit'} onClick={()=>{setAction('Login')}}>Login</div>                
            </div>
        </div>
    );
};

export default LoginSignUp;