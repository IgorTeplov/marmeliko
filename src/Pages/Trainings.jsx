import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Col, Container, Image, Row} from "react-bootstrap";
import star from "../assets/star.jpeg";
import {Link} from "react-router-dom";

const Trainings = () => {
  return(
    <div id='trainings'>
      <Header background={'green-bg'}/>
      <section className='trainings page'>
        <Container>
          <Row>
            <Col sm={12} className='text-center'>
              <h2 className='trainings-title blu-dot title'>Business Trainings</h2>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col sm={10} className='position-relative'>
              <Link to={/example/} className='d-block'><Image className='trainings-img image' src={star}/></Link>
              <h4 className='trainings-title subtitle'>Бизнес-тренинг (пример)</h4>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </div>
  );
}

export default Trainings;
