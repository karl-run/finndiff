import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';

import { userQuery } from '../../apollo/queries';
import Auth, { isAuthenticated } from './Auth';

import style from './LoginBox.css';

class AuthHandler extends Component<{}, {}> {
  constructor(props) {
    super(props);

    this.auth = new Auth(props.history);
  }

  render() {
    return (
      <div className={style.authBox}>
        {!isAuthenticated() && (
          <Fragment>
            <p>Logg inn for din egen liste.</p>
            <RaisedButton
              label="Logg inn"
              secondary={true}
              onClick={() => {
                this.auth.login();
              }}
            />
          </Fragment>
        )}
        {isAuthenticated() && (
          <Fragment>
            <p>Du er logget inn</p>
            <RaisedButton
              label="Logg ut"
              onClick={() => {
                this.auth.logout();
              }}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

const withUser = graphql(userQuery);

export default withRouter(withUser(AuthHandler));
