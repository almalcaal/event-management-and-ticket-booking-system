import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Activity = ({ activity }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/activity/${activity._id}`}>
        <Card.Img src={activity.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/activity/${activity._id}`}>
          <Card.Title as="div">
            <strong>{activity.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as="h3">${activity.price}</Card.Text>
    </Card>
  );
};

export default Activity;
