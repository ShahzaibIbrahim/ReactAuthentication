import { useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitChangePasswordFormHandler = (event) =>{
     event.preventDefault();

     const enteredPassword = passwordInputRef.current.value;

     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCsSgzOS2Crvqxrl8IutY47ltsCZ9eEJH4', {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          let errorMessage = "Authentication Failed!";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        //success case
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });

  }
  return (
    <form onSubmit={submitChangePasswordFormHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={passwordInputRef} minLength='7' type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
