import React from 'react';

const CourseOverview = () => {
  // Dummy data for demonstration purposes
  const course = {
    title: 'Introduction to Web Development',
    instructor: 'John Doe',
    duration: '6 weeks',
    description: 'Learn the basics of web development and create your first website.',
    enrollmentCount: 1000,
    rating: 4.5,
    reviews: [
      { id: 1, text: 'Great course! Highly recommended.' },
      { id: 2, text: 'The instructor explains concepts clearly.' },
      { id: 3, text: 'The course material is up to date.' }
    ]
  };

  return (
    <div className="course-overview">
      <h1>{course.title}</h1>
      <p className="instructor">Instructor: {course.instructor}</p>
      <p className="duration">Duration: {course.duration}</p>
      <p className="description">{course.description}</p>
      <p className="enrollment-count">Enrollment Count: {course.enrollmentCount}</p>
      <p className="rating">Rating: {course.rating}</p>

      <h2>Reviews:</h2>
      <ul className="reviews">
        {course.reviews.map(review => (
          <li key={review.id}>{review.text}</li>
        ))}
      </ul>

      <style jsx>{`
        .course-overview {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f7f7f7;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .instructor, .duration, .description, .enrollment-count, .rating {
          margin-bottom: 10px;
        }

        .reviews {
          margin-top: 10px;
          padding-left: 20px;
        }

        li {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default CourseOverview;
