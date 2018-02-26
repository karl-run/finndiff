import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Button from 'material-ui/Button';

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
        {!isAuthenticated() && <Fragment>
          <p>Logg inn for å kunne lage din egen liste av annonser.</p>
          <Button raised color="secondary" onClick={() => { this.auth.login(); }}>Logg inn</Button>
        </Fragment>}
        {isAuthenticated() && <Fragment>
          <p>Du er logget inn</p>
          <Button raised onClick={() => { this.auth.logout(); }}>Logg ut</Button>
        </Fragment>}
      </div>
    );
  }
}

const withUser = graphql(userQuery);

export default withRouter(withUser(AuthHandler));
