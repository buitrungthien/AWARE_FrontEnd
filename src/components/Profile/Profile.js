import React from 'react';
import classes from './Profile.module.css';
import Info from './Info/Info';

class Profile extends React.Component {
    state = {
        editing: false
    };

    editingHandler = () => {
        this.setState((prevState, props) => {
            return {
                editing: !prevState.editing
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-3 d-flex flex-column">
                    <h2 style={{ marginBottom: '20px' }}>My Account</h2>
                    <span className={classes['account-control-element']}>Account setting</span>
                    <span className={classes['account-control-element']}>Change password</span>
                </div>
                <div className={this.state.editing ? "col-md-5" : "col-md-4"}>
                    <Info
                        toggleEdit={this.editingHandler}
                        editing={this.state.editing}
                        userName={this.props.userName}
                        userEmail={this.props.userEmail}
                    />
                </div>
            </React.Fragment>
        );
    };
};

export default Profile;