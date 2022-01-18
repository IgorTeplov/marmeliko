import React from "react";
import './style.css';
import {Link} from "react-router-dom";
import {Col, Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import classNames from 'classnames';
import logo  from '../../assets/logo.svg';

const Header = (props) => {
  const {background} = props;
  return (
    <header id='header'>
      <Container fluid
                 className = {classNames(background, 'p-fix')}>
        <Navbar collapseOnSelect expand='md' id="navbar">
          <Container>
            <Navbar.Brand href='/'><img src={logo} alt="logo"/></Navbar.Brand>
            <Navbar.Toggle className='me-auto' aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Link
                  className='nav-link'
                  tabIndex='0'
                  role='button'
                  to='/about'
                >
                  Обо мне
                </Link>
                <NavDropdown title="Услуги" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#courses">
                    <Link className='nav-link' tabIndex='0' role='button' to='/courses'>Курсы</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#trainings">
                    <Link className='nav-link' tabIndex='0' role='button' to='/trainings'>Корпоративные тренинги</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#workshops">
                    <Link className='nav-link' tabIndex='0' role='button' to='/workshops'>Мастер-классы</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#consultations">
                    <Link className='nav-link' tabIndex='0' role='button' to='/consultations'>Консультации</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Link
                  className='nav-link'
                  tabIndex='0'
                  role='button'
                  to='/projects'
                >
                  Мои проекты
                </Link>
                <Link
                  className='nav-link'
                  tabIndex='0'
                  role='button'
                  to='/blogs'
                >
                  Блог
                </Link>
                <Link
                  className='nav-link'
                  tabIndex='0'
                  role='button'
                  to='/videos'
                >
                  Видео
                </Link>
              </Nav>
            </Navbar.Collapse>

            <Form>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Select
                  id='select'
                  className='select ms-auto'
                  onChange={props.onChangeLanguage}
                >
                  <option value='ru'>🇷🇺 Ru</option>
                  <option value='uk'>🇺🇦 Uk</option>
                  <option value='en'>🇬🇧 En</option>
                </Form.Select>
              </Form.Group>
            </Form>

          </Container>
        </Navbar>
        {/*<nav>*/}
        {/*  <Link to="/"> Home </Link>*/}
        {/*  <Link to="/about"> About </Link>*/}
        {/*  <Link to="/projects"> Projects </Link>*/}
        {/*  <Link to="/video"> Video </Link>*/}
        {/*</nav>*/}
      </Container>
    </header>
  )
}
export default Header;
