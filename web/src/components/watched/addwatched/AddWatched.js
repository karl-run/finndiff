// @flow

import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
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

  handleTextChange = event => {
    const value = event.target.value;

    this.setState({ value });

    if (value.length >= 9) {
      this.setState({ loading: true });
      this.props
        .mutate({ variables: { finnCode: value } })
        .then(wath => {
          console.log('wat', wath);
          this.setState({ loading: false });
          this.setState({ value: '' });
        })
        .catch(error => {
          this.setState({ loading: false });
          const [first] = error.graphQLErrors;
          this.setState({ error: first.message });
        });
    }
  };

  render() {
    const { data } = this.props;

    console.log('Props', this.props);

    return (
      <ListItem className={style.root} disabled className={style.root}>
        <TextField
          value={this.state.value}
          onChange={this.handleTextChange}
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
    refetchQueries: ['Watched'],
  },
});

export default withApollo(AddWatched);
