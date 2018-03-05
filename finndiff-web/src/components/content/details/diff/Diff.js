// @flow

import type { Node } from 'react';

import React, { Component, Fragment } from 'react';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import TextDiff from 'react-diffy';
import classNames from 'classnames';

import style from './Diff.css';

const ExpandoButton = ({ count, onClick, expanded }) => (
  <div className={style.expando}>
    <IconButton
      onClick={onClick}
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
      {expanded ? 'expand_less' : 'expand_more'}
    </IconButton>
    <div>{count - 2}</div>
  </div>
);

type HistoryProps = {
  type: string,
  children?: Node,
  history: any,
  simple: boolean,
};

type HistoryState = {
  show: boolean,
  item: ?Node,
};

class Diff extends Component<HistoryProps, HistoryState> {
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

  create = value => {
    const { type, history, children, simple, ...props } = this.props;

    return React.createElement(type, { ...props }, value.value);
  };

  renderSimple() {
    const { type, history, simple, children, ...props } = this.props;

    if (history.length === 1) {
      return this.create(history[0]);
    }

    return (
      <div className={style.simpleHistory}>
        <div className="diff-block">
          {React.createElement(type, { ...props }, history[0].value)}
          <i className="material-icons">trending_flat</i>
          {React.createElement(type, { ...props }, history[1].value)}
          <div className="date-stamp weak-text">{history[0].date}</div>
        </div>
        {history.length > 2 &&
          this.state.show && (
            <div className="overflow-diff">
              {history.map((value, i) => {
                if (i < 2) return null;

                let css = classNames('diff-block', { hidden: i >= 2 && !this.state.show });

                return (
                  <div className={css} key={value.value}>
                    {React.createElement(type, { ...props }, history[i - 1].value)}
                    <i className="material-icons">trending_flat</i>
                    {React.createElement(type, { ...props }, history[i].value)}
                    <div className="date-stamp weak-text">{history[i - 1].date}</div>
                  </div>
                );
              })}
              <div className="diff-block">
                {React.createElement(type, { ...props }, history[history.length - 1].value)}
                <div className="date-stamp weak-text">{history[history.length - 1].date}</div>
              </div>
            </div>
          )}
        {history.length > 2 && (
          <ExpandoButton count={history.length} onClick={this.toggleShow} expanded={this.state.show} />
        )}
      </div>
    );
  }

  renderComplex() {
    const { type, history } = this.props;

    if (!history.length) {
      return null;
    } else if (history.length === 1) {
      return this.create(history[0]);
    }

    return (
      <div className={style.complexHistory}>
        <div className="diff-block">
          <TextDiff elementType={type} inputA={history[0].value} inputB={history[1].value} type="words" />
          <div className="date-stamp weak-text">{history[0].date}</div>
        </div>
        {history.length > 2 && this.state.show && <Divider />}
        {history.length > 2 &&
          this.state.show && (
            <div className="overflow-diff">
              {history.map((value, i) => {
                if (i < 2) return null;

                let css = classNames('diff-block', { hidden: i >= 2 && !this.state.show });

                return (
                  <Fragment key={value.value}>
                    <div className={css}>
                      <TextDiff
                        elementType={type}
                        inputA={history[i - 1].value}
                        inputB={history[i].value}
                        type="words"
                      />
                      <div className="date-stamp weak-text">{history[i - 1].date}</div>
                    </div>
                    {i < history.length - 1 && <Divider />}
                  </Fragment>
                );
              })}
            </div>
          )}
        {history.length > 2 && (
          <ExpandoButton count={history.length} onClick={this.toggleShow} expanded={this.state.show} />
        )}
      </div>
    );
  }

  render() {
    if (this.props.simple) {
      return this.renderSimple();
    } else {
      return this.renderComplex();
    }
  }
}

export default Diff;
