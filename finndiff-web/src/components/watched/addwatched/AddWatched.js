// @flow

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import { ListItem } from 'material-ui/List';
import { addWatched } from '../../../apollo/mutations';

import style from './AddWatched.css';

type Props = {
  data: {
    version: string,
    error: boolean,
    loading: boolean,
  },
};

class AddWatched extends Component<Props> {
  state = {
    value: '',
    error: false,
    loading: false,
  };

  handleKeyUp = (event, _) => {
    if (event.keyCode === 13) {
      this.handleTextChange(event, _, true);
    }
  };

  handleTextChange = (event, _, hasEnter) => {
    const value = event.target.value;

    if (!value) {
      this.setState({ value: '', error: false, loading: false });
      return;
    }

    const matches = value.match(/\d+/g);

    if (!matches || !matches.length) {
      this.setState({ value });
      return;
    }

    const [number] = matches; // creates array from matches

    this.setState({ value });

    if (number.length >= 9 || hasEnter) {
      this.setState({ loading: true, error: false });
      this.props
        .mutate({ variables: { finnCode: number } })
        .then(wath => {
          this.setState({ loading: false });
          this.setState({ value: '' });
        })
        .catch(error => {
          this.setState({ value: number, loading: false });
          const [first] = error.graphQLErrors;

          if (first.message.indexOf('er allerede lagt til') >= 0) {
            this.props.history.push(`/diff/${number}`);
          }

          this.setState({ error: first.message });
        });
    }
  };

  render() {
    return (
      <ListItem className={style.root} disabled>
        <TextField
          value={this.state.value}
          onChange={this.handleTextChange}
          onKeyUp={this.handleKeyUp}
          style={{ width: '100%' }}
          floatingLabelText="Legg til ny finnkode"
          errorText={this.state.error}
          disabled={this.state.loading}
        />
      </ListItem>
    );
  }
}

const withApollo = graphql(addWatched, {
  options: {
    refetchQueries: ['Liked', 'Watched'],
  },
});

export default withApollo(withRouter(AddWatched));
