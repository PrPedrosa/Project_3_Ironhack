import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState("");
  const [sustainableFisherNumber, setSustainableFisherNumber] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSustainableFisherNumber = (e) => setSustainableFisherNumber(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      //try to create the user
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { email, password, name, sustainableFisherNumber });
      //redirect
      navigate('/login');
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className='form-box form-div'>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit} className='form-box form-form'>
       
        <label>Email*</label>
        <input type="email" name="email" value={email} onChange={handleEmail} required/>

        <label>Nome*</label>
        <input type="name" name="name" value={name} onChange={handleName} required/>

        <label>Nº Cartão Pescador Sustentável</label>
        <input type="sustainableFisherNumber" name="sustainableFisherNumber" value={sustainableFisherNumber} onChange={handleSustainableFisherNumber} />

        <label>Password*</label>
        <input type="password" name="password" value={password} onChange={handlePassword} required/>

        <button type="submit" className='buttons' style={{margin: "1vw"}}>Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <em>Campos marcados com * são obrigatórios</em>

      <p style={{margin: "10px 0px 0px 0px"}}>Já tem conta?</p>
      <Link to={'/signup'} className="small-buttons">Login</Link>
    </div>
  )
}

export default SignUp