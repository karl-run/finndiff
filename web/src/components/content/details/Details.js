// @flow

import React from 'react';
import { graphql } from 'react-apollo';
import Spinner from 'react-nano-spinner';

import { getSpecificAdQuery } from '../../../apollo/queries';

import style from './Details.css';

const TopSection = ({ ad }) => (
  <div>
    <h3>{ad.tittel}</h3>
    <h6>Sist oppdatert: {ad.pulled}</h6>
    <p>{ad.adresse}</p>
    <p>Pris: {ad.pris}</p>
    <p>{ad.omkostninger}</p>
  </div>
);

type Props = {
  data: {
    version: string,
  },
};

class Details extends React.Component<Props> {
  render() {
    const { data } = this.props;

    let content;
    if (data.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <TopSection ad={data.adHistory[0]} />
        </div>
      );
    }

    return (
      <div className={style.root}>
        <h1>Detaljer for ({this.props.match.params.finnCode})</h1>
        {content}
      </div>
    );
  }
}

const withAds = graphql(getSpecificAdQuery, {
  options: props => ({ variables: { finnCode: props.match.params.finnCode } }),
});

export default withAds(Details);
