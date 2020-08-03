import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import NoUser from './NoUser';

class UsersSummary extends Component {
    constructor (props) {
        super(props);

        this.state = {
            users: []
        }
    }

    handleBack = () => {
        this.props.history.push('/user-info');
    }

    fetchUsers = () => {
        axios.get('/allUsers')
            .then((res) => {
                const resUsers = res.data.map(obj => obj)
                this.setState({
                    users: [...resUsers]
                })
            })
            .catch((err) => console.log(err))
    }

    componentDidMount() {
        this.fetchUsers();
    }

    render () {
        const { users } = this.state;
        return this.props.userOnSession ?
            (
                <div className="container all-users">
                    <header>
                        <h3>All micrOAuth Users:</h3>
                    </header>
                    <section className='user-list'>
                        <ul>
                            {users.map((el) => (
                                <li key={el.id}>
                                    MicrOAuth User ID: {el.id}
                                    <br />Google Display Name: {el.name || 'no name on record'}
                                    <br />Google email: {el.email}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <button type="button" onClick={this.handleBack}>Back</button>
                </div>
            )
        :
            (
                <NoUser />
            )
    }
}

export default withRouter(UsersSummary);