import React, { Component } from 'react';
import Spinner from 'react-nano-spinner';

import Auth from './Auth';

class AuthCallback extends Component<{}, {}> {
  constructor(props) {
    super(props);

    this.auth = new Auth(props.history);
  }

  handleAuthentication = () => {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.auth.handleAuthentication();
    }
  };

  componentWillReceiveProps() {
    this.handleAuthentication();
  }

  render() {
    return (
      <div>
        <h3>Velkommen tilbake!</h3>
        <Spinner />
      </div>
    );
  }
}

export default AuthCallback;
