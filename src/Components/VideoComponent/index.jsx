import {Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';

const VideoComponent = (props) => {
  const video = props.video;
  // console.log('blog from Component = ', blog);

  useEffect(()=> {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <Row className='mb-5'>
      <Col sm={12} md={6} data-aos='fade-right'>
        <Link to={`/videos/${video.id}`} className='d-block'>
          <Image className='blog-img image' src={video.url}/>
        </Link>
      </Col>
      <Col sm={12} md={6} className='mt-md-0 mt-3' data-aos='fade-left'>
        <h4 className='blog-subtitle'>{video.albumId}</h4>
        <h6>{video.id}</h6>
        <p>{video.title}</p>
        <p>
          <span className='blog-date'>11 ноября 2020 г.</span>
          <span className='blog-time'>12:53</span>
        </p>
      </Col>
    </Row>
  )
}

export default VideoComponent;
