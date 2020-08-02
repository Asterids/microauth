import React from 'react';

const Info = (props) => {
    const { name, photo, googleId, email } = props.user;
    const { provider } = props;

    return (
        <div className="container">
            <header>
                <h3>Hi, {!name ? email : name}! Here is some of your {provider} profile info.</h3>
            </header>
            <section className="details">
                <p>Lookin' good on Google!</p>
                <img src={photo} alt="Your Google profile photo" className="profile-photo" />
                <p>Your Google ID is {googleId}</p>
                <p>Your contact email is {email}</p>
            </section>
        </div>
    )
}

export default Info;