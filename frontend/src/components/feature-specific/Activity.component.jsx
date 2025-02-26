import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating.component.jsx";

const Activity = ({ activity }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link
        to={`/activities/${activity._id}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Card.Img
          src={activity.image}
          variant="top"
          style={{ width: "250px", height: "200px", objectFit: "cover" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/activities/${activity._id}`}>
          <Card.Title as="div" className="activity-title">
            <strong>{activity.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as="div">
        <Rating
          value={activity.rating}
          text={`${activity.numReviews} reviews`}
        />
      </Card.Text>

      <Card.Text as="h3">${activity.price}</Card.Text>
    </Card>
  );
};

export default Activity;
