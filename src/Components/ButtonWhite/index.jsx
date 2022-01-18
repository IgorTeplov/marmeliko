import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

const ButtonWhite = (props) => {
  return (
    <Row className='justify-content-center'>
      <Col sm={10} md={6} lg={4} className='text-center'>
        <Link to={`/${props.link}`}>
          <button className='course-btn btn btn-white' type='button'>{props.text}</button>
        </Link>
      </Col>
    </Row>
  )
}

export default ButtonWhite;
