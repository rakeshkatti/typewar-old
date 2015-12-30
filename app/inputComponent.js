import React from "react";

export default React.createClass({
  render: function() {
    return (
      <input onChange={this.props.onUpdate} />
    );
  }
});