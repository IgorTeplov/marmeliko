import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Col, Container, Form, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import classNames from 'classnames';
import logo  from '../../assets/logo.svg';
import {FaFacebook, FaInstagram, FaLinkedinIn, FaTelegram, FaYoutube} from "react-icons/fa";

export default class Footer extends React.Component{
  render () {
    return (
      <footer id='footer' className='footer'>
        <Container>
          <Row className='d-flex align-items-center'>
            <Col sm={2} md={2} lg={1}>
              <Link to='/'><img src={logo} alt="logo"/></Link>
            </Col>
            <Col sm={3} md={3} lg={2} className='mt-3 mt-sm-0'>
              <Nav className='flex-column'>
                <Link className='link mb-3' to='/about'>
                  Обо мне
                </Link>
                <Link className='link' to='/courses'>
                  Курсы
                </Link>
              </Nav>
            </Col>
            <Col sm={3} md={3} lg={2} className='mt-3 mt-sm-0'>
              <Nav className='flex-column'>
                <Link className='link mb-3' to='/projects'>
                  Мои проекты
                </Link>
                <Link className='link mb-3' to='/blog'>
                  Блог
                </Link>
                <Link className='link' to='/video'>
                  Видео
                </Link>
              </Nav>
            </Col>
            <Col md={4} className='mt-4 mt-md-0 ms-auto text-center'>
              <a href='tel:+38(050)3636467' className='mt-sm-4 phone-text link'>+38 (050) 363 64 67</a>
              <Nav className='footer-nav justify-content-center mt-4'>
                <Link className='link mx-1' to='https://www.linkedin.com/in/oceanme/'>
                  <FaLinkedinIn/>
                </Link>
                <Link className='link mx-1' to='http://telegram.org/marmeliko'>
                  <FaTelegram/>
                </Link>
                <Link className='link mx-1' to='https://www.youtube.com/channel/UCtyXv6q-k-X89AXfsJMpqXA'>
                  <FaYoutube/>
                </Link>
                <Link className='link mx-1' to='https://www.instagram.com/marmeliko/'>
                  <FaInstagram/>
                </Link>
                <Link className='link mx-1' to='https://www.facebook.com/marina.melnick/'>
                  <FaFacebook/>
                </Link>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }
}
