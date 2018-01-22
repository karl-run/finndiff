// @flow

import React from 'react';
import { graphql } from 'react-apollo';
import Spinner from 'react-nano-spinner';
import IconButton from 'material-ui/IconButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';

import { getSpecificAdQuery } from '../../../apollo/queries';
import { pullOutHistory } from '../../../utils/historyStructure';

import style from './Details.css';

class History extends React.Component {
  state = {
    show: false,
  };

  toggleShow = event => {
    event.preventDefault();
    this.setState({ show: !this.state.show, item: event.target });
  };

  closeShow = () => {
    this.setState({ show: false });
  };

  render() {
    const { type, children, history, ...props } = this.props;

    return (
      <div className={style.history}>
        {history.length > 1 && (
          <IconButton
            onClick={this.toggleShow}
            iconClassName="material-icons"
            tooltip="Vis historikk"
            tooltipPosition="bottom-right"
            iconStyle={{
              width: 16,
              height: 16,
            }}
            style={{
              width: 32,
              height: 32,
              padding: 8,
            }}
          >
            info_outline
          </IconButton>
        )}
        {history.length > 0 && React.createElement(type, { ...props }, history[0].value)}
        <Popover
          open={this.state.show}
          anchorEl={this.state.item}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.closeShow}
          animation={PopoverAnimationVertical}
          className="popover"
        >
          {history.slice(1).map(value => React.createElement(type, { ...props, key: value.value }, value.value))}
        </Popover>
      </div>
    );
  }
}

const TopSection = ({ ad }) => (
  <div>
    <h3>{ad.tittel}</h3>
    <h6>Sist oppdatert: {ad.pulled}</h6>
    <p>{ad.adresse}</p>
  </div>
);

type Props = {
  data: {
    loading: boolean,
    adHistory: Array<any>,
  },
};

class Details extends React.Component<Props> {
  render() {
    const { data } = this.props;

    let content;
    if (data.loading) {
      content = <Spinner />;
    } else {
      const test = pullOutHistory(['pris'], data.adHistory);
      const test2 = pullOutHistory(['prisDetaljer', 'fellesgjeld'], data.adHistory);
      console.log(test);
      console.log(test2);
      content = (
        <div>
          <TopSection ad={data.adHistory[0]} />
          Pris: <History type="h4" history={pullOutHistory(['pris'], data.adHistory)} />
          Omkostninger: <History type="div" history={pullOutHistory(['omkostninger'], data.adHistory)} />
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
