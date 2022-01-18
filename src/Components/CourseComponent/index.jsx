import React from "react";
// import {Link} from "react-router-dom";
import {Col, Image, Row} from "react-bootstrap";
import work from "../../assets/work.jpeg";
// import {useParams} from "react-router";

const CourseComponent = (props) => {
  const course = props.course;
  // console.log('course from Component = ', course);
    return (
      <Row className='justify-content-center'>
        <Col sm={10} className='position-relative'>
          {/*<Image className='course-img image mb-5' src={work}/>*/}
          <Image className='course-img image mb-5' src={course.url}/>
          <h4 className='course-title subtitle'>{course.title}</h4>
        </Col>
      </Row>
    )
}

export default CourseComponent;
