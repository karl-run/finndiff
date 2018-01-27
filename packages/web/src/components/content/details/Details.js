// @flow

import React  from 'react';
import { graphql } from 'react-apollo';
import Spinner from 'react-nano-spinner';
import IconButton from 'material-ui/IconButton';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

import { getSpecificAdQuery } from '../../../apollo/queries';
import { pullOutHistory, formatter } from '../../../utils/historyStructure';
import Diff from './diff/Diff';

import style from './Details.css';

const IntroSection = ({ adHistory }) => (
  <Card>
    <CardTitle title={
      <Diff simple={false} type="h3" history={pullOutHistory(['tittel'], adHistory)} />
    } subtitle={`Sist endret: ${formatter.format(new Date(adHistory[adHistory.length - 1].pulled))}`} />
    <CardText>
      <Diff simple type="div" history={pullOutHistory(['adresse'], adHistory)}>Adresse/status:</Diff>
    </CardText>
  </Card>
);

const PriceSection = ({ adHistory }) => (
  <Card>
    <CardHeader title="Prisdetaljer" />
    <CardText>
      <dl className={style.descriptiveList}>
        <div>
          <dt>Pris</dt>
          <Diff simple type="dd" history={pullOutHistory(['pris'], adHistory)} />
        </div>
        {Object.keys(adHistory[0].prisDetaljer).map(key => {
          if (!adHistory[0].prisDetaljer[key] || typeof adHistory[0].prisDetaljer[key] !== 'object') return null;
          const beskrivelse = adHistory[0].prisDetaljer[key].beskrivelse;
          return (
            <div key={beskrivelse}>
              <dt>{beskrivelse}</dt>
              <Diff simple type="dd" history={pullOutHistory(['prisDetaljer', key, 'verdi'], adHistory)} />
            </div>
          )
        })}
      </dl>
    </CardText>
  </Card>
);

const ApartmentDetailsSection = ({ adHistory }) => (
  <Card>
    <CardHeader title="Boligdetaljer" />
    <CardText>
      <dl className={style.descriptiveList}>
        {Object.keys(adHistory[0].leilighetsDetaljer).map(key => {
          if (!adHistory[0].leilighetsDetaljer[key] || typeof adHistory[0].leilighetsDetaljer[key] !== 'object') return null;
          const beskrivelse = adHistory[0].leilighetsDetaljer[key].beskrivelse;
          return (
            <div key={beskrivelse}>
              <dt>{beskrivelse}</dt>
              <Diff simple type="dd" history={pullOutHistory(['leilighetsDetaljer', key, 'verdi'], adHistory)} />
            </div>
          )
        })}
      </dl>
    </CardText>
  </Card>
);

const OtherSection = ({ adHistory }) => {
  const omkostningerHistory = pullOutHistory(['omkostninger'], adHistory);

  if (!omkostningerHistory.length) return null;

  return (
    <Card>
      <CardHeader title="Annet" />
      <CardText>
        <Diff simple={false} type="div" history={omkostningerHistory} />
      </CardText>
    </Card>
  );
};

type Props = {
  data: {
    loading: boolean,
    adHistory: Array<any>,
  },
  match: {
    params: {
      finnCode: string,
    }
  }
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
          <IntroSection adHistory={data.adHistory} />
          <PriceSection adHistory={data.adHistory} />
          <ApartmentDetailsSection adHistory={data.adHistory} />
          <OtherSection adHistory={data.adHistory} />
        </div>
      );
    }

    return (
      <div className={style.root}>
        <h1>
          <span>Detaljer for {this.props.match.params.finnCode}</span>
          <IconButton
            href={`https://www.finn.no/realestate/homes/ad.html?finnkode=${this.props.match.params.finnCode}`}
            target="_blank"
            iconClassName="material-icons"
            tooltip="Gå til originalannonse"
            tooltipPosition="bottom-left"
            iconStyle={{
              width: 24,
              height: 24,
            }}
            style={{
              width: 36,
              height: 36,
              padding: 6,
            }}
          >
            link
          </IconButton>
        </h1>
        {content}
      </div>
    );
  }
}

const withAds = graphql(getSpecificAdQuery, {
  options: props => ({ variables: { finnCode: props.match.params.finnCode } }),
});

export default withAds(Details);
