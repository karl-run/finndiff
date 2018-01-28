import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';

import { userQuery } from '../../apollo/queries';

import Auth, { isAuthenticated } from './Auth';
import style from './AuthHandler.css';

class AuthHandlerHandler extends Component<{}, {}> {
  componentWillReceiveProps() {
    this.props.onLoad();
  }

  render() {
    return (
      <div>
        LOADING BOIS
      </div>
    );
  }
}

class AuthHandler extends Component<{}, {}> {
  constructor(props) {
    super(props);

    this.auth = new Auth(props.history);
  }

  handleAuthentication = () => {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.auth.handleAuthentication();
    }
  };

  render() {
    return (
      <div className={style.authBox}>
        <Route path="/callback" render={(props) => <AuthHandlerHandler {...props} onLoad={this.handleAuthentication} />} />
        {!isAuthenticated() && <Fragment>
          <p>Finndiff gir deg mer kontroll når du er logget inn.</p>
          <RaisedButton label="Logg inn" secondary={true} onClick={() => { this.auth.login(); }} />
        </Fragment>}
        {isAuthenticated() && <Fragment>
          <p>Du er logget inn</p>
          <RaisedButton label="Logg ut" onClick={() => { this.auth.logout(); }} />
        </Fragment>}
      </div>
    );
  }
}

const withUser = graphql(userQuery);

export default withRouter(withUser(AuthHandler));
