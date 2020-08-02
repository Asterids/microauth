import React from 'react';

const Login = (props) => {
    return (
        <div className="container">
          <a
            target="_self"
            href="/auth/google"
            className="googleLogin"
          >
            Log In with Google
          </a>
      </div>
    )
}

export default Login;
