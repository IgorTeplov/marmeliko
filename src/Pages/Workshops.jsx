import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Col, Container, Image, Row} from "react-bootstrap";
import template from "../assets/template.png";
import {Link} from "react-router-dom";

const Workshops = () => {
  return(
    <div id='workshops'>
      <Header background={'green-bg'}/>
      <section className='workshops page'>
        <Container>
          <Row>
            <Col sm={12} className='text-center'>
              <h2 className='workshops-title blu-dot title'>Personal Growth Trainings</h2>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col sm={10} className='position-relative'>
              <Link to={/example/} className='d-block'><Image className='workshops-img image' src={template}/></Link>
              <h4 className='workshops-title subtitle'>Тренинг по личностному росту (пример)</h4>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </div>
  );
}

export default Workshops;
