import "./register.css";
import map from "../../assets/map.jpg";
import pin from "../../assets/pin.png";
import { useRef, useState } from "react";
import axios from 'axios';

const Register = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
        username: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
    }

    try {
        const user = await axios.post("http://localhost:5000/api/users/register", newUser);
        setError(false);
        setSuccess(true);
    } catch(err) {
        setError(true);
        setSuccess(false);
    }
  }

  return (
    <div className='register-container'>
        <div className='map-img-container'>
            <img src={map} />
        </div>

        <div className='form-container'>
            <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
                <h2>Register to pin your destinations</h2>

                <input ref={nameRef} type="text" placeholder="Enter your username" />
                <input ref={emailRef} type="email" placeholder="Enter your email" />
                <input ref={passwordRef} type="password" placeholder="Enter your password" />
                {/* <input type="password" placeholder="Confirm password" /> */}

                <button className="button register-btn" type='submit'>Register</button>

                {success && <a className="success" href="/"><span>Successful. You can login now!</span></a>}
                {error && <span className="error">Something went wrong!</span>}
            </form>
        </div>

        <div className='travel-pin'>
            <h1>Travel Pin</h1>
            <img src={pin} />
        </div>
    </div>
  )
}

export default Register