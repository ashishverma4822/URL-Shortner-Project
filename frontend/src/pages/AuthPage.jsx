import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center">
      <div className="w-full backdrop-blur-lg-3xl shadow-2xl">
        {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
      </div>
    </div>
  );
};

export default AuthPage;
