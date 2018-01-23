// @flow

import React from 'react';
import classNames from 'classnames';

import style from './AnimatedLogoLoading.css';

type Props = {
  src: string,
  alt: string,
  delay: number,
  className?: ?string,
};

type State = {
  loaded: boolean,
  failed: boolean,
};

class ImageWithStatusText extends React.PureComponent<Props, State> {
  state = {
    loaded: false,
    failed: false,
  };

  static defaultProps = {
    className: null,
  };

  handleImageLoaded = () => {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, this.props.delay);
  };

  handleImageErrored = () => {
    this.setState({ failed: false });
  };

  render() {
    const { src, alt, className } = this.props;
    const { loaded } = this.state;

    return (
      <div className={style.root}>
        <img
          alt={alt}
          src={src}
          className={classNames(className, { loaded })}
          onLoad={this.handleImageLoaded}
          onError={this.handleImageErrored}
        />
      </div>
    );
  }
}

export default ImageWithStatusText;
