// @flow

import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';

import Details from './details/Details';

import style from './Content.css';

const InfoPoint = ({ className, text }) => (
  <Paper className={classNames(style.infoPoint, className)} zDepth={1}>
    <i className="material-icons">arrow_back</i>
    <span>{text}</span>
  </Paper>
);

const GetStarted = () => {
  return (
    <div className={style.getStarted}>
      <h2>Kom i gang med finndiff</h2>
      <p>
        Finndiff er et verktøy som lar deg <span className="pun-finn">finn</span>e <span className="pun-diff">diff</span>eranser
        i annonser etter hvert som de ligger ute.
      </p>
      <InfoPoint className="new-code" text="Legg til en ny annonse" />
      <InfoPoint className="existing-ad" text="Eller se detaljer om en allerede overvåket annonse" />
    </div>
  );
};

const NoRoute = () => {
  return (
    <Fragment>
      <h2>404</h2>
      <p>Finner ikke hva du ser etter. :(</p>
    </Fragment>
  );
};


class Version extends Component<{}> {
  render() {
    return (
      <div className={style.root}>
        <Switch>
          <Route exact path="/" component={GetStarted} />
          <Route exact path="/diff/:finnCode" component={Details} />
          <Route component={NoRoute} />
        </Switch>
      </div>
    );
  }
}

export default Version;
