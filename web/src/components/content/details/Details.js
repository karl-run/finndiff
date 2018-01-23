// @flow

import type { Node } from 'react';

import React from 'react';
import { graphql } from 'react-apollo';
import Spinner from 'react-nano-spinner';
import IconButton from 'material-ui/IconButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

import { getSpecificAdQuery } from '../../../apollo/queries';
import { pullOutHistory, formatter } from '../../../utils/historyStructure';

import style from './Details.css';

type HistoryProps = {
  type: string,
  children?: Node,
  history: any,
}

type HistoryState = {
  show: boolean,
  item: ?Node,
}

class History extends React.Component<HistoryProps, HistoryState> {
  state = {
    show: false,
    item: null,
  };

  toggleShow = event => {
    event.preventDefault();
    this.setState({ show: !this.state.show, item: event.target });
  };

  closeShow = () => {
    this.setState({ show: false });
  };

  render() {
    const { type, history, children, ...props } = this.props;

    return (
      <div className={style.history}>
        {children}{children && '\u00A0'}
        {history.length > 0 && React.createElement(type, { ...props }, history[0].value)}
        {history.length > 1 && (
          <IconButton
            onClick={this.toggleShow}
            iconClassName="material-icons"
            iconStyle={{
              width: 24,
              height: 24,
            }}
            style={{
              width: 32,
              height: 32,
              padding: 2,
            }}
          >
            history
          </IconButton>
        )}
        <Popover
          open={this.state.show}
          anchorEl={this.state.item}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.closeShow}
          animation={PopoverAnimationVertical}
          className={style.popover}
        >
          <Menu className="inner-display">
            {history.map(value => {
              return <div key={value.value}>{React.createElement(type, { ...props }, value.value)}
                <span className="weak-text">{value.date}</span>
              </div>;
            })
            }
          </Menu>
        </Popover>
      </div>
    );
  }
}

const IntroSection = ({ adHistory }) => (
  <div>
    <History type="h3" history={pullOutHistory(['tittel'], adHistory)} />
    <div>Sist endret: {formatter.format(new Date(adHistory[0].pulled))} </div>
    <History type="div" history={pullOutHistory(['adresse'], adHistory)}>Adresse/status:</History>
  </div>
);

const PriceSection = ({ adHistory }) => (
  <dl className={style.descriptiveList}>
    {Object.keys(adHistory[0].prisDetaljer).map(key => {
      if (!adHistory[0].prisDetaljer[key] || typeof adHistory[0].prisDetaljer[key] !== 'object') return null;
      const beskrivelse = adHistory[0].prisDetaljer[key].beskrivelse;
      return (
        <div key={beskrivelse}>
          <dt>{beskrivelse}</dt>
          <History type="dd" history={pullOutHistory(['prisDetaljer', key, 'verdi'], adHistory)} />
        </div>
      )
    })}
  </dl>
);

const ApartmentDetailsSection = ({ adHistory }) => (
  <dl className={style.descriptiveList}>
    {Object.keys(adHistory[0].leilighetsDetaljer).map(key => {
      if (!adHistory[0].leilighetsDetaljer[key] || typeof adHistory[0].leilighetsDetaljer[key] !== 'object') return null;
      const beskrivelse = adHistory[0].leilighetsDetaljer[key].beskrivelse;
      return (
        <div key={beskrivelse}>
          <dt>{beskrivelse}</dt>
          <History type="dd" history={pullOutHistory(['leilighetsDetaljer', key, 'verdi'], adHistory)} />
        </div>
      )
    })}
  </dl>
);

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
          <h6>Prisdetaljer</h6>
          <PriceSection adHistory={data.adHistory} />
          <h6>Boligdetaljer</h6>
          <ApartmentDetailsSection adHistory={data.adHistory} />
          <h6>Annet</h6>
          <History type="div" history={pullOutHistory(['omkostninger'], data.adHistory)} />
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
