//react
import { useState } from 'react';
import { useNavigate } from 'react-router';

import AuthToggle from '@atoms/AuthToggle/AuthToggle.jsx';
import SignInButton from '@atoms/Buttons/SignInButton.jsx';
import ErrorBanner from '@atoms/ErrorBanner/ErrorBanner.jsx';
import InputField from '@atoms/InputField/InputField.jsx';

//functions
import { authWithEmailAndPassword } from '@utils/index.js';

export default function FormToSignUpOrIn({ authMode }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClickEmailAndPassword(e);
  };

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessageCredentials, setErrorMessageCredentials] = useState({
    errorEmail: '',
    errorPassword: '',
  });
  const [errorMessageValidation, setErrorMessageValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickEmailAndPassword = authWithEmailAndPassword(
    credentials,
    errorMessageCredentials,
    setErrorMessageCredentials,
    authMode,
    setErrorMessageValidation,
    setIsLoading,
    navigate,
  );

  return (
    <form noValidate className='flex flex-col gap-3' onSubmit={handleSubmit}>
      {authMode === 'signup' && (
        <InputField
          state={{ setCredentials, field: 'userName' }}
          error={errorMessageCredentials}
          type='text'
          name='name'
        />
      )}
      <InputField
        state={{ setCredentials, field: 'email' }}
        error={errorMessageCredentials}
        type='email'
        name='mail'
      />
      <InputField
        state={{ setCredentials, field: 'password' }}
        error={errorMessageCredentials}
        type='password'
        name='password'
      />
      <SignInButton isLoading={isLoading} authMode={authMode} />
      <AuthToggle authMode={authMode} />
      <ErrorBanner
        errorMessageValidation={errorMessageValidation}
        authMode={authMode}
      />
    </form>
  );
}
