import React from "react";
import Header from "./Header";
import Content from "./Content";
const Courses = ({ courses }) => {
  const coursesList = () =>
    courses.map(course => (
      <div key={course.id}>
        <Header text={course.name} />
        <Content parts={course.parts} />
      </div>
    ));
  return <div>{coursesList()}</div>;
};
export default Courses;
