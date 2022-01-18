import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import { useParams } from "react-router";
import { useState, useEffect} from "react";
import spinner from "../assets/spinner.svg";
import CourseComponent from "../Components/CourseComponent";
import CustomersService from "../Helpers/CustomersService";
import VideoComponent from "../Components/VideoComponent";

const customersService = new CustomersService();

const Video = () => {
  const {id} = useParams();
  const [video, setVideo] = useState({});
  const [pageId, setPageId] = useState('video');
  const [language, setLanguage] = useState('ru');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  //post-запрос при загрузке страницы для получения контента для страницы Video Id
  useEffect(()=>{
    // const url = endpoints.getContentVideoPage; // endpoint для получения контента для video по id
    const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
    const requestOptions = {
      // method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ mylang: language, mypage: pageId, id})
    };
    customersService.fetchData(url, setIsLoading, setVideo, setError, requestOptions)
  }, [id])

  return(
    <>
      {isLoading
        ?
        <div className='wrapper-spinner'>
          <Image src={spinner} className='spinner' alt='spinner'/>
        </div>
        :
        <div id='video'>
          <Header
            background={'gray-bg'}
          />
          <section className='video page'>
            <Container>
              <Row>
                <Col sm={12} className='text-center'>
                  <h2 className='course-title blu-dot title'>{video.title}</h2>
                </Col>
              </Row>
              <VideoComponent video={video} />
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
    </>
  );
}

export default Video;
