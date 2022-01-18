import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Col, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import spinner from "../assets/spinner.svg";
import BlogComponent from "../Components/BlogComponent";
import CustomersService from "../Helpers/CustomersService";
import endpoints from "../Helpers/endpoints";

const Blogs = () => {
  const [content, setContent] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [language, setLanguage] = useState('ru');
  const [pageId, setPageId] = useState('blogs');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(5);

  const customersService = new CustomersService();

  // post-запрос при загрузке страницы, отправляет - Язык и ID страницы, получает - блоги по-странично
  useEffect(() => {
    if(fetching) {
      const url = `https://jsonplaceholder.typicode.com/photos?_limit=2&_page=${currentPage}`;

      const requestOptions = {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ mylang: language,  mypage: pageId})
      };
      customersService.fetchDataScroll(url, setIsLoading, setBlogs, blogs, setCurrentPage, setError, setFetching, requestOptions)
    }
  }, [fetching]);

  // post-запрос при загрузке страницы для получения макс кол-ва страниц
  // useEffect(()=>{
  //   const url = endpoints.totalPagesUrl; // endpoint для получения макс кол-ва страниц
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ mylang: language, mypage: pageId })
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
      // && (currentPage < totalCount)) {
      && (blogs.length < totalCount)) {
      setFetching(true)
    }
    // console.log('общая Н стр. с учетом скролла = ', e.target.documentElement.scrollHeight);
    // console.log('текущ.полож.скролла от верха стр. = ', e.target.documentElement.scrollTop);
    // console.log('Н видимой обл.стр./Н браузера = ', window.innerHeight);
  }

  const useBlogs = Array.from(blogs).map((blog) => {
    return (
      <Link key={blog.id} to={`/blogs/${blog.id}`}>
        <BlogComponent blog={blog} />
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
        <div id='blogs'>
          <Header background={'green-bg'}/>
          <section className='blog page'>
            <Container>
              <Row>
                <Col sm={12} className='text-center'>
                  <h2 className='blog-title blu-dot title'>Blog</h2>
                </Col>
              </Row>
              <Row>
                <ul>
                  {blogs && useBlogs}
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

export default Blogs;