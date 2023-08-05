import React, { useState } from 'react';
import { supabaseClient } from '../../services/client';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

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

      console.log({ data });

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
    <div style={{ minHeight: '100vh', padding: '12px' }}>
      <div style={{ maxWidth: 'md', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center', margin: '6px' }}>Welcome to the App</h1>
        {error && (
          <div style={{ marginBottom: '6px', backgroundColor: 'red', padding: '4px' }}>
            <p style={{ textAlign: 'center' }}>{error}</p>
          </div>
        )}
        <div
          style={{
            padding: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}
        >
          {isSubmitted ? (
            <h2 style={{ textAlign: 'center', color: '#000' }}>Please check {email} for login link</h2>
          ) : (
            <form onSubmit={submitHandler}>
              <div style={{ marginBottom: '16px' }}>
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
