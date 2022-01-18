import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Col, Container, Image, Row} from "react-bootstrap";
import template from "../assets/template.png";
import {Link} from "react-router-dom";
// import useFetch from "../Helpers/useFetch";

const Projects = () => {
  // const { data: projects, isPending, error } = useFetch('http://localhost:8080/projects');
  return(
    <div id='projects'>
      <Header background={'green-bg'}/>
      <section className='projects page'>
        <Container>
          <Row>
            <Col sm={12} className='text-center'>
              <h2 className='projects-title blu-dot title'>Projects</h2>
            </Col>
            <Col sm={12} className='position-relative'>
              <Link to={/example/} className='d-block'><Image className='projects-img image' src={template}/></Link>
              <h4 className='project-title subtitle'>Проект(пример)</h4>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </div>
  );
}

export default Projects;
