import React from 'react';
import { withRouter } from 'react-router-dom';

const NoUser = (props) => {
    return (
      <div className="container">
        <h3>Oops, you are not logged in!</h3>
        <button type="button" onClick={() => {props.history.push('/')}}>Home</button>
      </div>
    )
}

export default withRouter(NoUser);
