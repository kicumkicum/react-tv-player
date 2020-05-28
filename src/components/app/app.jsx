import React from "react";
import pt from "prop-types";


const App = (props) => {
  const {device} = props;

  return (
    <div>
      Hello {device.info.type()}!
    </div>
  );
};

App.propTypes = {
  device: pt.object.isRequired,
};


export default App;
