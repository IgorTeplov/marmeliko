import React, {useEffect, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {Col, Container, Image, Row} from "react-bootstrap";
import template from "../assets/template.png";
import {Link} from "react-router-dom";
import spinner from "../assets/spinner.svg";
import CustomersService from "../Helpers/CustomersService";
import endpoints from "../Helpers/endpoints";
import VideoComponent from "../Components/VideoComponent";
import CourseComponent from "../Components/CourseComponent";

const customersService = new CustomersService();

const Videos = () => {
  const [content, setContent] = useState({});
  const [videos, setVideos] = useState([]);
  const [language, setLanguage] = useState('ru');
  const [pageId, setPageId] = useState('videos');
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
      customersService.fetchDataScroll(url, setIsLoading, setVideos, videos, setCurrentPage, setError, setFetching, requestOptions)
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
    if((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
      && (currentPage < totalCount)) {
      setFetching(true)
    }
    // console.log('общая Н стр. с учетом скролла = ', e.target.documentElement.scrollHeight);
    // console.log('текущ.полож.скролла от верха стр. = ', e.target.documentElement.scrollTop);
    // console.log('Н видимой обл.стр./Н браузера = ', window.innerHeight);
  }

  const useVideos = Array.from(videos).map((video) => {
    return (
      <Link key={video.id} to={`/videos/${video.id}`}>
        <VideoComponent video={video} />
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
        <div id='videos'>
          <Header background={'green-bg'}/>
          <section className='videos section'>
            <Container>
              <Row>
                <Col sm={12} className='text-center'>
                  <h2 className='projects-title blu-dot title'>Videos</h2>
                </Col>
              </Row>
              <Row>
                <ul>
                  {videos && useVideos}
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

export default Videos;
