import React from "react";
import Header from "../Components/Header";
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import Footer from "../Components/Footer";
import {Col, Container, Image, Row} from "react-bootstrap";

import about from '../assets/about.png';
import template from "../assets/template.png";

const About = () => {
  // const { data: about, isPending, error } = useFetch('http://localhost:8080/');

  return(
    <div id='about' className='about'>
      <Header background={'green-bg'}/>
      <section className='aboutme page'>
        <Container>
          <Row>
            <Col className='text-center'>
              <h2 className='aboutme-title blu-dot title'>Марина Мельник</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={about} className='aboutme-img image'/>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='aboutme-content'>
                <p><b>Эксперт в области проектного подхода.</b> С помощью практик и инструментов
                  проектного менеджмента цели в жизни и бизнесе возможно достичь быстрее и проще.
                </p>
                <p><b>Карьерный терапевт.</b> Помогаю перезагрузить вашу карьеру.</p>
                <p>
                  15+ лет опыта в сфере информационных технологий, более 12 лет опыта управления
                  проектами и программами (70+ сотрудников). Опыт в управлении процессами,
                  бизнес-анализе, управлении качеством, управлении поставками, управлении персоналом,
                  управлении рисками, управлении взаимоотношениями с клиентами в IT-аутсорсинге.
                </p>
                <p>
                  Создание и управление центрами повышения квалификации, образовательными программами
                  и программами управления талантами.
                </p>
                <p>
                  Сооснователь IT-конференции run-it.com.ua (более 450 участников в год).
                </p>
                <p>
                  Основатель и бизнес-тренер учебного центра SkillsUp (курсы, мастер-классы;
                  корпоративные программы для ПриватБанк, VARUS, БаДМ)
                </p>
                <p>
                  Эксперт и тренер учебного центра Luxoft (корпоративные программы для ТОВ «РУШ», АТБ, Luxoft).
                </p>
                <p>
                  Agile-консультант (координация проектов по Agile-трансформации на уровне команд
                  и компаний в Швеции, Швейцарии, Польше).
                </p>
                <p>Международные сертификации в области Agile, Scrum, Management.</p>
                <p>Сертифицированный тренер по персональной и групповой медитации.</p>
                <p>Спикер международных конференций и автор профессиональных статей.</p>
                <p>ТОП 20 женщин предпринимателей Украины в рамках программ SheExports в 2019 году.</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={8}>
              <div className='aboutme-text'>
                <p>Создание и управление центрами повышения квалификации, образовательными программами
                  и программами управления талантами. Международные сертификации в области Agile, Scrum,
                  Management.</p>
              </div>
            </Col>
            <Col xs={12} lg={4}>
              <Image src={template} className='aboutme-photo image'/>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </div>
  );
}

export default About;
