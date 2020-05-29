import React from "react";
import pt from "prop-types";


const Log = (props) => {
  const {action} = props;

  return (
    <div>
      Last action: {action}
    </div>
  );
};


Log.propTypes = {
  action: pt.string.isRequired,
};


export default Log;
