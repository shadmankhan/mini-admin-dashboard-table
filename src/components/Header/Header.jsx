import React from 'react';
import Button from '../common/Button/Button';
import './Header.css';
import { supabaseClient } from '../../services/client';
import { SNACKBAR_TYPE } from '../../utils/constants';

const Header = ({ loggedInUser, signInAction, handleSnackbar }) => {
  const signOutAction = async () => {
    const { error } = await supabaseClient.auth.signOut();
    console.log({ error });
    if (!error) {
      console.log('Success');
      handleSnackbar({
        type: SNACKBAR_TYPE.success,
        message: 'Signed Out Successfully!'
      });
    } else {
      console.log('Error');
      handleSnackbar({
        type: SNACKBAR_TYPE.fail,
        message: 'Request failed, please try again!'
      });
    }
  };

  const handleLogInOut = async () => {
    if (loggedInUser) {
      signOutAction();
    } else {
      signInAction();
    }
  };

  const userEmail = loggedInUser?.user?.email;

  return (
    <header>
      <div className="header__division">
        <span className="header__heading">{userEmail ? `Welcome, ${userEmail}` : 'Sign In to see your data'}</span>
      </div>
      <div className="header__division">
        <nav>
          <Button onClick={handleLogInOut} color="red">
            {loggedInUser ? 'Sign Out' : 'Sign In'}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
