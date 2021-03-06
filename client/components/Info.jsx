import React from 'react';
import { withRouter } from 'react-router-dom';
import NoUser from './NoUser';

const Info = (props) => {
    const { name, photo, googleId, email } = props.user;
    const { provider, logout } = props;

    const visitUserSummary = () => {
        props.history.push('/users-summary');
    }

    const handleLogout = () => {
        props.history.push('/');
        logout();
    }

    return props.user.id ?
        (
            <div className="container">
                <header>
                    <h3>Hi, {!name ? email : name}! Here is some of your {provider} profile info.</h3>
                </header>
                <section className="details">
                    <p>Here's your Google profile image:</p>
                    <img src={photo} alt="Your Google profile photo" className="profile-photo" />
                    <p>Your contact email is {email}</p>
                </section>
                <div className="action-links">
                    <button type="button" onClick={visitUserSummary}>View All Users</button>
                    <button type="button" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        )
        :
        <NoUser />
}

export default withRouter(Info);