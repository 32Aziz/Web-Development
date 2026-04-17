import { useState, useEffect, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/register/registeration.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register({ setShowRegister }) {
  //useRef it is give address of the element and we can use it to focus on the element when the component is rendered.
  // in simple words, it is used to access the DOM element directly and change it.
  // Common using of useRef is to focus on the input field when the component is rendered.
  // methods of useRef: current, focus(), click(), value, etc.
  const userRef = useRef();
  const errRef = useRef();

  //Username
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //Password
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  // pwdFocus is used to determine whether to show the instructions for the password requirements. 
  // It is set to true when the user clicks on the password input field and set to false when the user clicks away from the password input field.
  const [pwdFocus, setPwdFocus] = useState(false);

  //Confirm Password
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //error message and success message
  const [errMsg, setErrMsg] = useState('');

  // we focus on the username input field when the component is rendered. 
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // we validate the username whenever the user state changes.
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]); // if pwd or matchPwd changes, we validate the password and check if it matches the confirm password.

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]); // if user, pwd, or matchPwd changes, we clear the error message.
  
  // what async do ? 
  // async is a keyword that is used to declare an asynchronous function. 
  // An asynchronous function is a function that can perform asynchronous operations and can be paused and resumed.
  // asynchronous function to handle the form submission. 
  // We validate the username and password again before submitting the form. 
  // If the username or password is not valid, we set the error message and return. 
  // If the username and password are valid, we can submit the form to the server (not implemented in this code).
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if the username or password is not valid, we set the error message and return.
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = pwd === matchPwd;

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    setUser('');
    setPwd('');
    setMatchPwd('');

    if (setShowRegister) {
      setShowRegister(false);
    }
  };

  return (
    <section className="d-flex flex-column justify-content-center align-items-center">
      <p 
        ref={errRef} 
        className={errMsg ? "errmsg" : "offscreen"} 
        // {if the text inside this element changes, announce it to the user immediately.}
        // keep track of changes to the content of this element and announce it to the user immediately.
        aria-live="assertive"
      > 
        {errMsg}
      </p>

      <h1>Register</h1>

      <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
        <label htmlFor="username"> 
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)} // when the user clicks on the input field, we set userFocus to true and when the user clicks away from the input field, we set userFocus to false.
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="usernote" //this input is described by another element whose id is usernote.
          required
          className="mt-2 mb-2"
        />

        <p id="usernote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor="password">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input
          type="password"
          id="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)} 
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          required
          className="mt-2 mb-2"
        />

        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number and a special character. <br />
          Allowed special characters: 
          <span aria-label="exclamation mark">!</span> 
          <span aria-label="at symbol">@</span> 
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span> 
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd">
          Confirm Password:
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input
          type="password"
          id="confirm_pwd"
          value={matchPwd}
          onChange={(e) => setMatchPwd(e.target.value)}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)} 
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          required
          className="mt-2 mb-2"
        />

        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        {/* by default, the button is disabled until all fields are valid */}
        <button disabled={!validName || !validPwd || !validMatch ? true : false}>
          Sign Up
        </button>
      </form>
    </section>
  );
}

export default Register;