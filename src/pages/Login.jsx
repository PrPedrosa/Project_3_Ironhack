import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser} = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      //try to create the user
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });

      //store the token that we get from the login request
      storeToken(response.data.authToken);

      //Validate the token
      authenticateUser();

      //redirect
      navigate('/profile');
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className='form-box form-div' style={{height: "100vh"}}>
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit} className='form-box form-form'>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={handleEmail} required/>

        <label>Password</label>
        <input type="password" name="password" value={password} onChange={handlePassword} required/>

        <button type="submit" className='buttons' style={{margin: "1vw"}}>Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p style={{margin: "10px 0px 0px 0px"}}>Ainda não tem conta?</p>
      <Link to={'/signup'} className="small-buttons">Criar Conta</Link>
    </div>
  );
}

export default Login;