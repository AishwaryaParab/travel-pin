import map from "../../assets/map.jpg";
import pin from "../../assets/pin.png";
import "./login.css";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);

  console.log("User in login --->" + user);

  useEffect(() => {
    if(user) {
      navigate("/pins");
    }
  }, [user])

  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDetails = {
        username: nameRef.current.value,
        password: passwordRef.current.value
    }

    try {
        const userResponse = await axios.post("http://localhost:5000/api/users/login", userDetails);
        localStorage.setItem('user', JSON.stringify(userResponse.data));
        setUser(userResponse.data);
        setError(false);
    } catch(err) {
        setError(true);
    }
  }

  return (
    <div className='login-container'>
      <div className='map-img-container'>
          <img src={map} />
      </div>

      <div className='form-container'>
          <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
              <h2>Login to pin your destinations</h2>

              <input ref={nameRef} type="text" placeholder="Enter your username" />
              <input ref={passwordRef} type="password" placeholder="Enter your password" />

              <button className="button login-btn" type='submit'>Login</button>
              <a href="/register" className="register-link"><span>Don't have an account? Register here</span></a>
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

export default Login