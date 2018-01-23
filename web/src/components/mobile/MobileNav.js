// @flow

import React from 'react';
import AppBar from 'material-ui/AppBar';

type Props = {
  isMobile: boolean,
  toggle: Function,
  change: (open: boolean) => void,
};

class MobileNav extends React.Component<Props> {
  render() {
    if (!this.props.isMobile) return null;

    return (
      <AppBar
        onLeftIconButtonClick={this.props.toggle}
        title="Finndiff"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}

export default MobileNav;
