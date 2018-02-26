import React, { Component } from 'react';
import Dialog, { DialogActions, DialogTitle, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
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
      return (
        <Dialog
          open={this.state.hasError}
        >
          <DialogTitle>Noe uforventet gikk galt</DialogTitle>
          <DialogContent>
            <p>Dersom problemet fortsetter ta kontakt.</p>
            <p>Ta kontakt via en av knappene nedenfor for a automatisk generer en feilrapport.</p>
            <Button
              href={`mailto:karl@karl.run?subject=Feilrapport for Finndiff&body=${this.state.errorMessage}%0A%0A${this.state.errorInfo}%0A%0ASkriv hva du gjorde:%0A`}
              color="primary"
              icon={<i className="material-icons">email</i>}
            >Send epost</Button>
            <Button
              href={`https://github.com/karl-run/finndiff/issues/new?title=Ukjent%20feil&body=\`${this.state.errorMessage}\`%0A%0A\`${this.state.errorInfo}\`%0A%0ADet siste du gjorde:%0A`}
              target="_blank"
              color="primary"
              icon={<i className="material-icons">code</i>}
            >Nytt issue på Github</Button>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={this.refresh}
            >Prøv igjen</Button>,
          </DialogActions>
        </Dialog>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;