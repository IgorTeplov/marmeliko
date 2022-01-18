import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Image, Nav, Row} from "react-bootstrap";
import Header from "../Components/Header";
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import {Link} from "react-router-dom";
import CustomersService from "../Helpers/CustomersService";

import main from '../assets/main.jpeg';
import photo from '../assets/photo.jpeg';
import Footer from "../Components/Footer";
import {FaFacebook, FaInstagram, FaLinkedinIn, FaTelegram, FaYoutube} from "react-icons/fa";
import Aos from 'aos';
import 'aos/dist/aos.css';

import arrow from '../assets/arrow.svg';
import spinner from '../assets/spinner.svg';
import {FiPhoneCall} from "react-icons/fi";
import {MdOutlineEmail, MdOutlineTextsms} from "react-icons/md";
import CourseComponent from "../Components/CourseComponent";
import endpoints from "../Helpers/endpoints";
import BlogComponent from "../Components/BlogComponent";
import ButtonWhite from "../Components/ButtonWhite";

const customersService = new CustomersService();

const Home = () => {
  const [content, setContent] = useState({});
  const [course, setCourse] = useState({});
  const [blog, setBlog] = useState({});
  const [video, setVideo] = useState({});
  const [language, setLanguage] = useState('ru');
  const [pageId, setPageId] = useState('main');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(false);
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);


  // post-запрос при загрузке главной страницы,
  // отправляет - Язык и ID страницы, получает - общий контент
  useEffect(() => {
     const url = `https://jsonplaceholder.typicode.com/posts/3`;
     //  const url = endpoints.getMainContent;
      const requestOptions = {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ mylang: language,  mypage: pageId})
      };
      customersService.fetchData(url, setIsLoading, setContent, setError, requestOptions)
        // .then(r => console.log('r = ', r));
  }, []);

  // post-запрос при загрузке главной страницы,
  // отправляет - Язык и ID страницы и ID секции Курсы, получает - контент для секции Курсы
  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/photos/3`;
    // const url = endpoints.getMainContentCourse;
    const requestOptions = {
      // method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ mylang: language,  mypage: pageId, mysection: 'courses'})
    };
    customersService.fetchData(url, setIsLoadingCourse, setCourse, setError, requestOptions)
  }, []);

  // post-запрос при загрузке главной страницы,
  // отправляет - Язык и ID страницы и ID секции Блог, получает - контент для секции Блог
  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/photos/12`;
    // const url = endpoints.getMainContentBlog;
    const requestOptions = {
      // method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ mylang: language,  mypage: pageId, mysection: 'blog'})
    };
    customersService.fetchData(url, setIsLoadingBlog, setBlog, setError, requestOptions)
  }, []);

  // Aos animation initial
  useEffect(()=> {
    Aos.init({ duration: 2000 });
  }, []);

  function onChangeContent(data) {
    setContent(data)
  }

  function onChangeLanguage(e) {
    setLanguage(e.target.value);

    const result = customersService.getContent(e.target.value)
      .then(response => {
        console.log('you have successfully change language');
        console.log('response.data = ', response);
        setContent(response);
      })
      .catch(e => {
        console.log('There was an error! Please re-check your answers.', e);
      });

    e.preventDefault();
    console.log('result = ', result);
  }
  console.log('isLoading = ', isLoading);

  return(
    <>
      {isLoading
        ?
        <div className='wrapper-spinner'>
          <Image src={spinner} className='spinner' alt='spinner'/>
        </div>
        :
        <div id='home' className='home'>
          <Header
            background={'gray-bg'}
            onChangeLanguage={onChangeLanguage}
            content={content}
          />
          <Image
            src={main}
            className='img-fluid shadow-4 header-img'
            alt='background'
          />
          <section className='header-wrapper section'>
            <Container>
              <div className='header-content'>
                <h1
                  className='header-title title'
                  data-aos="fade-up"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center"
                >
                  {content.title}
                  {/*Марина Мельник*/}
                </h1>
                <p className='header-subtitle'>
                  Помогаю сориентироваться в море возможностей, достичь своих
                  целей с помощью проектного подхода. Понятно. Пошагово. Кайфово.
                </p>
                <Link to="/about">
                  <button className="btn-wrapper btn btn-orange" type="button">Узнать больше</button>
                </Link>
              </div>
              <div className='header-social mt-4 d-flex align-items-baseline'>
                <Container>
                  <Row>
                    <Col md={4} xs={12}>
                      <Nav className='footer-nav justify-content-md-start justify-content-center mt-4'>
                        <Link className='link me-3' to='https://www.linkedin.com/in/oceanme/'>
                          <FaLinkedinIn/>
                        </Link>
                        <Link className='link me-3' to='http://telegram.org/marmeliko'>
                          <FaTelegram/>
                        </Link>
                        <Link className='link me-3' to='https://www.youtube.com/channel/UCtyXv6q-k-X89AXfsJMpqXA'>
                          <FaYoutube/>
                        </Link>
                        <Link className='link me-3' to='https://www.instagram.com/marmeliko/'>
                          <FaInstagram/>
                        </Link>
                        <Link className='link me-3' to='https://www.facebook.com/marina.melnick/'>
                          <FaFacebook/>
                        </Link>
                      </Nav>
                    </Col>
                    <Col md={4} xs={12} className='text-center mt-xs-2 mt-md-0'>
                      <a href='tel:+38(050)3636467' className='mt-sm-4 phone-text link'>+38 (050) 363 64 67</a>
                    </Col>
                    <Col md={4} className='text-end'>
                      <a href="#about" className='h-xs-50 h-md-100'>
                        <Image src={arrow} className='h-xs-50 h-md-100'/>
                      </a>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Container>
          </section>
          <section className='info section'>
            <Container>
              <Row className='text-center'>
                <h2 className='info-title blu-dot'>Marmeliko</h2>
              </Row>
              <Row>
                <Col md={6}>
                  <p data-aos='fade-right'>Каждый проходит свой интересный, неповторимый
                    путь познания и развития. Я прохожу свой.
                  </p>
                  <p data-aos='fade-right'>
                    Мне повезло выбрать профессию, где важен результат,
                    целеполагание и есть много подходов по достижению
                    задуманного.
                  </p>
                  <p data-aos='fade-right'>
                    Начав применять эти техники за пределами профессиональной
                    деятельности, я добилась значительных результатов и в
                    сфере личностного роста и в социальной, и в творческой
                    сферах. Позже начала консультировать и обучать топ-менеджеров,
                    настраивать эффективные бизнес-процессы в компаниях.
                  </p>
                </Col>
                <Col md={6}>
                  <p data-aos='fade-left'>
                    И во всем мне помогает проектный подход. Я верю, что умение
                    реализовывать проекты встроено в нашу ДНК. Как проект мы можем
                    представить что угодно.
                  </p>
                  <p data-aos='fade-left'>
                    Даже наши состояния - это мини проекты и, если результат этих
                    проектов над не подходит, мы всегда может стартовать разработку
                    следующей версии и выйти на другие ощущения.
                  </p>
                  <p data-aos='fade-left'>
                    Здесь я буду делиться практиками проектного менеджмента и показывать,
                    как они работают в любой сфере нашей жизни.
                  </p>
                  <p data-aos='fade-left'>
                    Я буду приводить личные примеры - в основном, а также примеры моих
                    клиентов, коллег
                  </p>
                </Col>
              </Row>
              <Row>
                <blockquote className="text-center info-quote">Всё то, что есть в нашей жизни когда-то было нашим или
                  чьим-то проектом.
                </blockquote>
              </Row>
            </Container>

          </section>
          <section className='send'>
            <Container>
              <Row className='color-wrapper'>
                <div className='border-wrapper'></div>
                <Col sm={12}>
                  <div className='send-wrapper'>
                    <Row>
                      <Col lg={6} sm={12}>
                        <h3 className='send-title yellow-dot'>
                          Давайте обсудим чем я могу вам помочь..
                        </h3>
                        <p className='send-text'>
                          Запишитесь на бесплатную 30-минутную онлайн консультацию, и я свяжусь с вами,
                          чтобы согласовать время.
                        </p>
                        <Form id='form-send' className='form-send'>
                          {/*<input type="hidden" name="key" value="def2" />*/}
                          {/*<input type="hidden" name="csrfmiddlewaretoken"*/}
                          {/*       value="cnsP7ZO37H4fYPOo1ZJOJw0QM16m9culd3knTi8BZ6Mu9dUC9GObtvZ9oDfsRJ36" />*/}
                          <Form.Control id='name' className='send-input' type='text' placeholder="Имя"/>
                          <Form.Control id='phone' className='send-input' type='phone'
                                        placeholder='+38 (___) ___-__-__ '/>
                          <Button className="btn-send btn btn-orange text-center" type="submit">Записаться</Button>
                          <div className="form-group form-check">
                            <input className="form-check-input" id="exampleCheck1" type="checkbox" name="agree"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Даю согласие на обработку
                              данных</label>
                          </div>
                          {/*<Form.Text className="mt-5">*/}
                          {/*  Нажимая на кнопку, вы соглашаетесь на обработку персональных данных*/}
                          {/*  и соглашаетесь с <a href="https://skillsup.ua/about/gdpr/">Политикой конфиденциальности</a>*/}
                          {/*  и <a href="https://skillsup.ua/about/public-offer/">Договором офертой</a>*/}
                          {/*</Form.Text>*/}
                        </Form>
                      </Col>
                      <Col lg={6} sm={12} className='text-center'>
                        <Image className='send-photo' src={photo}/>
                        <p>Марина Мельник. Эксперт в области проектного подхода.
                          Карьерный терапевт
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          {isLoadingBlog
            ?
            <div className='wrapper-spinner'>
              <Image src={spinner} className='spinner' alt='spinner'/>
            </div>
            :
            <section className='blog section'>
              <Container>
                <Row>
                  <Col sm={12} className='text-center'>
                    <h2 className='blog-title blu-dot title'>Блог</h2>
                  </Col>
                </Row>
                <BlogComponent blog={blog}/>
                <ButtonWhite text={'Посмотреть все'} link={'blogs'}/>
              </Container>
            </section>
          }

          {isLoadingCourse
            ?
            <div className='wrapper-spinner'>
              <Image src={spinner} className='spinner' alt='spinner'/>
            </div>
            :
            <section className='courses'>
              <Container>
                <Row>
                  <Col sm={12} className='text-center'>
                    <h2 className='courses-title blu-dot title'>Курсы</h2>
                  </Col>
                </Row>
                <CourseComponent course={course}/>
                <ButtonWhite text={'Посмотреть все'} link={'courses'}/>
              </Container>
            </section>
          }
          <section className='video section pt-0 pb-5'>
            <Container>
              <Row>
                <Col sm={12} className='text-center'>
                  <h2 className='video-title blu-dot title'>Video</h2>
                </Col>
              </Row>
              <Row className='justify-content-center'>
                <Col md={10} lg={7} className='position-relative'>
                  {/*<Link to={/example/} classname='d-block'><Image className='video-img image' src={template}/></Link>*/}
                  <iframe
                    src="https://www.youtube.com/embed/vmCWyB9VDpM"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                  <h4 className='video-subtitle'>Видео(пример)</h4>
                </Col>
              </Row>
            </Container>
          </section>
          <section className='contact'>
            <Container>
              <Row>
                <Col sm={12}>
                  <h2 className='yellow-dot title-contact'>Давайте свяжемся</h2>
                </Col>
              </Row>
              <Row className='justify-content-center'>
                <Col md={3}>
                  <FiPhoneCall className='phone-img icon mb-2'/>
                  <p className='phone-span'>Позвонить:</p>
                  <a href='tel:+38(050)3636467' className='phone-text link'>+38 (050) 363 64 67</a>
                </Col>
                <Col md={3} className='mt-5 mt-md-0'>
                  <MdOutlineEmail className='phone-img icon mb-2'/>
                  <p className='email-span'>Напишите:</p>
                  <a className='link email-text' href="mail:marmeliko@gmail.com">marmeliko@gmail.com</a>
                </Col>
                <Col md={3} className='mt-5 mt-md-0'>
                  <MdOutlineTextsms className='phone-img icon mb-2'/>
                  <p className='link-span'>LinkedIn:</p>
                  <a className='link link-text' href="#">LinkedIn</a>
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

export default Home;
