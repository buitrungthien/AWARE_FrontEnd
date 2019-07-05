import React from 'react';
import classes from './Badge.module.css';
// import mail from '../../../assets/images/notification/mail.svg';

class Badge extends React.Component {

    render() {

        return (
            // eslint-disable-next-line
            <a href="#" class={classes.Notification}>
                <span>Inbox</span>
                <span class={classes.Badge}>3</span>
            </a>
        );
    }
}

export default Badge;