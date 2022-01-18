import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Col, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import spinner from "../assets/spinner.svg";
import CourseComponent from "../Components/CourseComponent";
import CustomersService from "../Helpers/CustomersService";
import endpoints from "../Helpers/endpoints";

const customersService = new CustomersService();

const Courses = () => {
  const [content, setContent] = useState({});
  const [courses, setCourses] = useState([]);
  const [language, setLanguage] = useState('ru');
  const [pageId, setPageId] = useState('courses');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(3);

  // post-запрос при загрузке страницы, отправляет - Язык и ID страницы, получает - посты по-странично
  useEffect(() => {
    if(fetching) {
      console.log('fetching = ', fetching);
      const url = `https://jsonplaceholder.typicode.com/photos?_limit=9&_page=${currentPage}`;

      const requestOptions = {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ mylang: language,  mypage: pageId})
      };
      customersService.fetchDataScroll(url, setIsLoading, setCourses, courses, setCurrentPage, setError, setFetching, requestOptions)
        .then(r => console.log('r = ', r));
    }
  }, [fetching]);

  // post-запрос при загрузке страницы для получения макс кол-ва страниц
  // useEffect(()=>{
  //   const url = endpoints.totalPagesUrl; // endpoint для получения макс кол-ва страниц
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ mylang: language, mypage: pageId})
  //   };
  //   customersService.fetchData(url, setIsLoading, setTotalCount, setError, requestOptions)
  // }, [])

  // слушатель страницы на событие скроллинга
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    // console.log('currentPage = ', currentPage);
    // console.log('totalCount = ', totalCount);
    if((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
      && (currentPage < totalCount)) {
      setFetching(true)
    }
    // console.log('общая Н стр. с учетом скролла = ', e.target.documentElement.scrollHeight);
    // console.log('текущ.полож.скролла от верха стр. = ', e.target.documentElement.scrollTop);
    // console.log('Н видимой обл.стр./Н браузера = ', window.innerHeight);
  }

  const useCourses = Array.from(courses).map((course) => {
    return (
      <Link key={course.id} to={`/courses/${course.id}`}>
        <CourseComponent course={course} />
      </Link>
      )
  })

  return(
    <>
      {isLoading
        ?
        <div className='wrapper-spinner'>
          <Image src={spinner} className='spinner' alt='spinner'/>
        </div>
        :
        <div id='courses'>
          <Header background={'green-bg'}/>
          <section className='courses section'>
            <Container>
              <Row>
                <Col sm={12} className='text-center'>
                  <h2 className='projects-title blu-dot title'>Courses</h2>
                </Col>
              </Row>
              <Row>
                <ul>
                  {courses && useCourses}
                </ul>
              </Row>
            </Container>
          </section>
          <Footer/>
        </div>
      }
    </>
  );
}

export default Courses;
