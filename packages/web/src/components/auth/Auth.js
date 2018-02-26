import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'finndiff.eu.auth0.com',
    clientID: '8FSU6cyuJQ0sHJsoJo3oQT7ZHJHv0D7B',
    redirectUri: `${
      process.env.NODE_ENV === 'production' ? 'https://finndiff.no/callback' : 'http://localhost:3000/callback'
    }?redirect=${window.location.pathname}`,
    audience: 'https://finndiff.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  });

  constructor(history) {
    this.history = history;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.replace('/');
      } else if (err) {
        this.history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.history.replace('/');
  }

  logout() {
    silentLogout();
    window.location.reload();
  }
}

export const silentLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
};

export const isAuthenticated = () => {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
};
