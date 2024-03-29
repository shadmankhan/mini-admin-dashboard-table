import { useEffect, useRef, useState } from 'react';
import './App.css';

// components
import SignIn from './components/SignIn/SignIn';
import Snackbar from './components/common/Snackbar/Snackbar';
import Header from './components/Header/Header';
import Members from './components/Members/Members';

import { supabaseClient } from './services/client';
import { SNACKBAR_TYPE } from './utils/constants';

const App = () => {
  const snackbarRef = useRef(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      try {
        if (session) {
          sessionStorage.setItem('session', JSON.stringify(session));
          setLoggedInUser(session);
          handleSnackbar({
            type: SNACKBAR_TYPE.success,
            message: event === 'INITIAL_SESSION' ? 'Already Signed In!' : 'Signed In Successfully!'
          });
        }

        const errorHash = window.location.hash
          ? window.location.hash
              .substring(1)
              .split('&')
              .find(e => e.startsWith('error_description'))
              ?.split?.('=')?.[1]
              ?.replaceAll?.('+', ' ')
          : '';

        errorHash &&
          handleSnackbar({
            type: SNACKBAR_TYPE.fail,
            message: errorHash
          });

        if (event === 'SIGNED_OUT' || !session) {
          setLoggedInUser(null);
        }
      } catch (error) {
        handleSnackbar({
          type: SNACKBAR_TYPE.fail,
          message: error?.message || 'Something went wrong!'
        });
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
      {loggedInUser ? <Members handleSnackbar={handleSnackbar} loggedInUser={loggedInUser} /> : <SignIn />}
      <Snackbar ref={snackbarRef} />
    </>
  );
};

export default App;
