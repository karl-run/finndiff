// @flow

import React, { Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import Spinner from 'react-nano-spinner';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

import { getSpecificAdQuery, likedQuery } from '../../../apollo/queries';
import { likeMutation } from '../../../apollo/mutations';
import { pullOutHistory, formatter } from '../../../utils/historyStructure';
import Diff from './diff/Diff';

import Auth, { isAuthenticated } from './../../auth/Auth';

import style from './Details.css';

const IntroSection = ({ adHistory }) => {
  if (!adHistory.length) return null;

  return (
    <Card>
      <CardTitle title={
        <Diff simple={false} type="h3" history={pullOutHistory(['tittel'], adHistory)} />
      } subtitle={`Sist endret: ${formatter.format(new Date(adHistory[adHistory.length - 1].pulled))}`} />
      <CardText>
        <Diff simple type="div" history={pullOutHistory(['adresse'], adHistory)}>Adresse/status:</Diff>
      </CardText>
    </Card>
  );
};

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

const GeneralTextSections = ({ adHistory }) => (
  <Card>
    <CardHeader title="Andre detaljer" />
    <CardText>
      <Fragment>
        {Object.keys(adHistory[0].generelleSeksjoner).map(key => {
          if (!adHistory[0].generelleSeksjoner[key] || typeof adHistory[0].generelleSeksjoner[key] !== 'object') return null;
          const beskrivelse = adHistory[0].generelleSeksjoner[key].beskrivelse;
          return (
            <div id={key} key={beskrivelse}>
              <h6>{beskrivelse}</h6>
              <Diff simple={false} type="p" history={pullOutHistory(['generelleSeksjoner', key, 'verdi'], adHistory)} />
            </div>
          )
        })}
      </Fragment>
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

const WhopsSection = ({ match }) => (
  <div>
    <p>Ojda! Noe veldig rart har skjedd. Denne annonsen har blitt korrupt når den ble lagt til.</p>
    <p>Send meg gjerne en mail på <a href="mailto:karl@karl.run">karl@karl.run</a> så kan jeg finne ut hva som har skjedd. :-)</p>
    <p>Alternativt kan du opprette et issue på <a
      href={`https://github.com/karl-run/finndiff/issues/new?title=Korrupt%20annonse:%20${match.params.finnCode}&body=Skriv%20gjerne%20litt%20mer`}>
      Github
    </a>
    </p>
  </div>
);

type Props = {
  ad: {
    loading: boolean,
    adHistory: Array<any>,
  },
  liked: {
    loading: boolean,
    liked: Array<any>,
  },
  match: {
    params: {
      finnCode: string,
    }
  }
};

type State = {
  showLoginModal: boolean,
  liked: boolean,
  error: ?string,
}

class Details extends React.Component<Props, State> {
  state = { showLoginModal: false, liked: false, error: null, success: null };
  auth = new Auth();

  handleLogin = () => {
    this.auth.login();
  };

  handleLike = (event, checked) => {
    if (!isAuthenticated()) {
      this.setState({ showLoginModal: true })
    } else {
      this.setState({ liked: true });
      this.props.like({ variables: { finnCode: this.props.match.params.finnCode } })
        .then(() => {
          this.setState({ success: 'Annonse lagt til i dine lister' });
        })
        .catch((error) => {
          const [first] = error.graphQLErrors;
          this.setState({ liked: false, error: first.message });
        })

    }
  };

  closeModal = () => {
    this.setState({ showLoginModal: false });
  };

  unerror = () => {
    this.setState({ error: null });
  };

  unsuccess = () => {
    this.setState({ success: null });
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.liked.loading) {
      if (nextProps.liked.liked.some((like) => nextProps.match.params.finnCode === like.finnCode)) {
        this.setState({ liked: true });
      } else {
        this.setState({ liked: false });
      }
    }

    if (!nextProps.ad.loading) {
      const { hash } = window.location;
      console.log("hash", hash);
      if (hash !== '') {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => element.scrollIntoView(), 0);
        }
      }
    }
  }

  render() {
    const { ad } = this.props;

    let content;
    if (ad.loading) {
      content = <Spinner />;
    } else if (!ad.adHistory.length) {
      content = <WhopsSection match={this.props.match} />;
    } else {
      content = (
        <div>
          <IntroSection adHistory={ad.adHistory} />
          <PriceSection adHistory={ad.adHistory} />
          <ApartmentDetailsSection adHistory={ad.adHistory} />
          <GeneralTextSections adHistory={ad.adHistory} />
          <OtherSection adHistory={ad.adHistory} />
        </div>
      );
    }

    const actions = [
      <FlatButton
        label="Lukk"
        primary={true}
        onClick={this.closeModal}
      />,
      <FlatButton
        label="Logg inn"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleLogin}
      />,
    ];

    return (
      <div className={style.root}>
        <h1>
          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            onCheck={this.handleLike}
            checked={this.state.liked}
          />
          <div>Detaljer for {this.props.match.params.finnCode}</div>
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
        <Dialog
          title="Logg inn"
          actions={actions}
          modal={false}
          open={this.state.showLoginModal}
          onRequestClose={this.closeModal}
        >
          For å kunne lagre annonser må du logge inn.
        </Dialog>
        <Snackbar
          open={!!this.state.error}
          message={(
            <div className="snackbar-message"><i className="material-icons white">error_outline</i>{this.state.error}</div>
          )}
          autoHideDuration={5000}
          onRequestClose={this.unerror}
        />
        <Snackbar
          open={!!this.state.success}
          message={(
            <div className="snackbar-message"><i className="material-icons white">done</i>{this.state.success}</div>
          )}
          autoHideDuration={3000}
          onRequestClose={this.unsuccess}
        />
      </div>
    );
  }
}

const withAds = compose(
  graphql(likeMutation, {
    name: 'like',
    options: {
      refetchQueries: ['Liked'],
    },
  }),
  graphql(likedQuery, {
    name: 'liked',
  }),
  graphql(getSpecificAdQuery, {
    name: 'ad',
    options: props => ({ variables: { finnCode: props.match.params.finnCode } }),
  }),
);

export default withAds(Details);
