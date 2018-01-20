// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';

import style from './Content.css';

const Details = props => {
  return (
    <div>
      <h2>Details</h2>
      I am detail for {props.match.params.finnCode}
    </div>
  );
};

const GetStarted = props => {
  return (
    <div>
      <h2>Get started</h2>
      Pls do something
    </div>
  );
};

const NowFound = props => {
  return <h2>Whops!!</h2>;
};
class Version extends React.Component {
  render() {
    return (
      <div className={style.root}>
        <Switch>
          <Route exact path="/" component={GetStarted} />
          <Route exact path="/diff/:finnCode" component={Details} />
          <Route component={NowFound} />
        </Switch>
        <p>TODO</p>
        <IconButton href="https://github.com/karl-run/finndiff" iconClassName="material-icons">
          code
        </IconButton>
      </div>
    );
  }
}

export default Version;
