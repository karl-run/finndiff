// @flow

import React from 'react';
import IconButton from 'material-ui/IconButton';

import style from './Content.css';

class Version extends React.PureComponent {
  render() {
    return (
      <div className={style.root}>
        <h2>finndiff</h2>
        <p>TODO</p>
        <IconButton href="https://github.com/karl-run/finndiff" iconClassName="material-icons">
          code
        </IconButton>
      </div>
    );
  }
}

export default Version;
