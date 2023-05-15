import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import PropTypes from "prop-types";

AlertCT.propTypes = {
  typeAlert: PropTypes.string,
  contentAlert: PropTypes.string,
  titleAlert: PropTypes.string,
};

function AlertCT(props) {
  const [show, setShow] = useState(true);
  return (
    <Alert show={show} variant={props.typeAlert}>
      <Alert.Heading>{props.titleAlert}</Alert.Heading>
      <p>{props.contentAlert}</p>
      <div className="d-flex justify-content-end">
        <Button onClick={() => setShow(false)} variant="outline-success">
          Close me y'all!
        </Button>
      </div>
    </Alert>
  );
}

export default AlertCT;
