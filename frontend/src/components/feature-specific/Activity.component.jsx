import { Card } from "react-bootstrap";

const Activity = ({ activity }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/activity/${activity._id}`}>
        <Card.Img src={activity.image} variant="top" />
      </a>

      <Card.Body>
        <a href={`/activity/${activity._id}`}>
          <Card.Title as="div">
            <strong>{activity.name}</strong>
          </Card.Title>
        </a>
      </Card.Body>

      <Card.Text as="h3">${activity.price}</Card.Text>
    </Card>
  );
};

export default Activity;
