import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div className="greeting">
        <h1>Serious, {this.props.name}!</h1>
      </div>
    );
  }
});