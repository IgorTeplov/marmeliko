import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import photo from "../assets/photo.jpeg";

const Consultations = () => {
  return(
    <div id='consultations'>
      <Header background={'green-bg'}/>
      <section className='consultations page'>
        <Container>
          <Row>
            <Col sm={12} className='text-left'>
              <h2 className='workshops-title blu-dot title'>Консультации</h2>
              <p>Текст</p>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <h3>Текст</h3>
              <p>Текст</p>
            </Col>
            <Col sm={12}>
              <h3>Текст</h3>
              <p>Текст</p>
            </Col>
            <Col sm={12}>
              <h3>Текст</h3>
              <p>Текст</p>
            </Col>
            <Col sm={12}>
              <h3>Текст</h3>
              <p>Текст</p>
            </Col>
          </Row>
          <Row className='color-wrapper'>
            <div className='border-wrapper'></div>
            <Col sm={12}>
              <div className='send-wrapper'>
                <Row>
                  <Col sm={12}>
                    <h3 className='send-title yellow-dot'>
                      Давайте обсудим  чем я могу вам помочь..
                    </h3>
                    <Form id='form-send' className='form-send'>
                      <Row>
                        <Col lg={4} md={12}>
                          <Form.Control id='name' className='send-input mb-3' type='text' placeholder="Имя" />
                        </Col>
                        <Col lg={4} md={12}>
                          <Form.Control id='phone' className='send-input mb-3' type='phone' placeholder='+38 (___) ___-__-__ ' />
                        </Col>
                        <Col lg={4} md={12}>
                          <Button className="btn-send btn btn-orange text-center m-0" type="submit">Записаться</Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </div>
  );
}

export default Consultations;
