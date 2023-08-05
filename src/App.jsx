import { useEffect, useRef, useState } from 'react';
import './App.css';

// components
import SignIn from './components/SignIn/SignIn';
import Counter from './components/counter/Counter';
import Snackbar from './components/common/Snackbar/Snackbar';

import { supabaseClient } from './services/client';
import Header from './components/Header/Header';
import { SNACKBAR_TYPE } from './utils/constants';

const App = () => {
  const snackbarRef = useRef(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log({ event, session });
      sessionStorage.setItem('session', JSON.stringify(session));
      if (session) {
        setLoggedInUser(session);
        handleSnackbar({
          type: SNACKBAR_TYPE.success,
          message: event === 'INITIAL_SESSION' ? 'Already Signed In!' : 'Signed In Successfully!'
        });
      }
      if (event === 'SIGNED_OUT' || !session) {
        setLoggedInUser(null);
      }
    });

    return () => {
      authListener?.unsubscribe?.();
    };
  }, []);

  const signInAction = e => {
    e.preventDefault();
    setLoggedInUser(null);
  };

  const handleSnackbar = ({ type, message }) => {
    snackbarRef.current.message = message;
    snackbarRef.current.type = type;
    snackbarRef.current.show();
  };

  return (
    <>
      <Header loggedInUser={loggedInUser} signInAction={signInAction} handleSnackbar={handleSnackbar} />
      {loggedInUser ? <Counter /> : <SignIn />}
      <Snackbar ref={snackbarRef} />
    </>
  );
};

export default App;
