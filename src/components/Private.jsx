import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { Navigate } from 'react-router-dom';

function Private(props) {
  const { loading, loggedIn } = useContext(AuthContext);
  //first we check if the page is still loading
  if (loading) return <p>Loading...</p>;
  //if the user is not loggedin we redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
    //if the user is loggedIn we return the children (the page we are trying to protect)
  } else {
    return props.children;
  }
}

export default Private;