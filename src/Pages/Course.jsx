import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import { useParams } from "react-router";
import { useState, useEffect} from "react";
import spinner from "../assets/spinner.svg";
import CourseComponent from "../Components/CourseComponent";
import CustomersService from "../Helpers/CustomersService";

const customersService = new CustomersService();

const Course = () => {
  const {id} = useParams();
  const [course, setCourse] = useState({});
  const [pageId, setPageId] = useState('course');
  const [language, setLanguage] = useState('ru');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  //post-запрос при загрузке страницы для получения контента для страницы Курса Id
  useEffect(()=>{
    // const url = endpoints.getContentCoursePage; // endpoint для получения контента для курса по id
    const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
    const requestOptions = {
      // method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ mylang: language, mypage: pageId, id})
    };
    customersService.fetchData(url, setIsLoading, setCourse, setError, requestOptions)
  }, [id])

  return(
    <React.Fragment>
      {isLoading
        ?
        <div className='wrapper-spinner'>
          <Image src={spinner} className='spinner' alt='spinner'/>
        </div>
        :
        <div id='course'>
          <Header
            background={'gray-bg'}
          />
          <section className='course page'>
            <Container>
              <Row>
                <Col sm={12} className='text-center'>
                  <h2 className='course-title blu-dot title'>{course.title}</h2>
                </Col>
              </Row>
              <CourseComponent course={course} />
              <Row className='color-wrapper mt-5'>
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
      }
    </React.Fragment>
  );
}

export default Course;
