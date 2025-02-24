import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../common/Loader.component.jsx";
import Message from "../common/Message.component.jsx";
import { useGetTopActivitiesQuery } from "../../slices/activitiesApi.slice.js";

const ActivityCarousel = () => {
  const { data: activities, isLoading, error } = useGetTopActivitiesQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="carousel-container">
      <Carousel pause="hover" className="carousel bg-primary mb-4">
        {activities.map((activity) => (
          <Carousel.Item key={activity._id}>
            <Link to={`/activities/${activity._id}`}>
              <Image src={activity.image} alt={activity.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2 className="text-white text-right">
                  {activity.name} (${activity.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ActivityCarousel;
