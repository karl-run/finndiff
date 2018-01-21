// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';

import style from './Content.css';

const Details = props => {
  return (
    <div>
      <h2>Details</h2>
      I am detail for {props.match.params.finnCode}
    </div>
  );
};

const InfoPoint = ({ className, text }) => (
  <Paper className={classNames(style.infoPoint, className)} zDepth={1}>
    <i className="material-icons">arrow_back</i>
    <span>{text}</span>
  </Paper>
);

const GetStarted = props => {
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
      </div>
    );
  }
}

export default Version;
