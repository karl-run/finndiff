import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { reportClientError } from '../../utils/errorReport';
import { silentLogout } from '../auth/Auth';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorMessage: error.message,
      errorInfo: info.componentStack,
    });

    silentLogout();
    reportClientError(error.message, info.componentStack);
  }

  refresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const actions = [<FlatButton label="Prøv igjen" primary={true} onClick={this.refresh} />];

      return (
        <Dialog title="Noe uforventet gikk galt" actions={actions} modal={true} open={this.state.hasError}>
          <p>Dersom problemet fortsetter ta kontakt.</p>
          <p>Ta kontakt via en av knappene nedenfor for a automatisk generer en feilrapport.</p>
          <FlatButton
            href={`mailto:karl@karl.run?subject=Feilrapport for Finndiff&body=${this.state.errorMessage}%0A%0A${
              this.state.errorInfo
            }%0A%0ASkriv hva du gjorde:%0A`}
            label="Send epost"
            primary={true}
            icon={<i className="material-icons">email</i>}
          />
          <FlatButton
            href={`https://github.com/karl-run/finndiff/issues/new?title=Ukjent%20feil&body=\`${
              this.state.errorMessage
            }\`%0A%0A\`${this.state.errorInfo}\`%0A%0ADet siste du gjorde:%0A`}
            target="_blank"
            label="Nytt issue på Github"
            primary={true}
            icon={<i className="material-icons">code</i>}
          />
        </Dialog>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
