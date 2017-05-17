import React, { Component } from 'react';

class Paginator extends Component {
  render() {
    return (
      <div className="paginator">
        <div className="btn-group" role="group">
          <button className="btn btn-link" onClick={this.props.onFirst}>
            <span className="glyphicon glyphicon-backward" aria-hidden="true"></span>
            First page
          </button>

          <button className="btn btn-link" onClick={this.props.onPrev}>
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            Previous page
          </button>
        </div>

        Page {this.props.currentPage} out of {this.props.pagesCount}

        <div className="btn-group" role="group">
          <button className="btn btn-link" onClick={this.props.onNext}>
            Next page
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </button>

          <button className="btn btn-link" onClick={this.props.onLast}>
            Last page
            <span className="glyphicon glyphicon-forward" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    );
  }
}
export default Paginator;
