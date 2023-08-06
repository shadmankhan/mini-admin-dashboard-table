import React, { useState } from 'react';
import { supabaseClient } from '../../services/client';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.href
        }
      });

      if (error) {
        setError(error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changeHandler = event => {
    setEmail(event.target.value);
  };

  return (
    <div className="signIn__root">
      <div className="signIn__root_div">
        <h1 className="signIn__title">Welcome to the App</h1>
        {error && (
          <div className="signIn__errorContainer">
            <p className="signIn__errorContainer_p">{error}</p>
          </div>
        )}
        <div className="signIn__formContainer">
          {isSubmitted ? (
            <h2 className="signIn__isSubmit">Please check {email} for login link</h2>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="signIn__form_div">
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  label="Email address"
                  placeholder="Enter your email address"
                  onChange={changeHandler}
                />
              </div>
              <Button type="submit" disabled={isLoading} isLoading={isLoading} color="green">
                Sign in
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
