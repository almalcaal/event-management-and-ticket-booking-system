import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/feature-specific/Rating.component";
import activities from "../activities";

const ActivityScreen = () => {
  const { id: activityId } = useParams();
  //   console.log("here id:", activityId);
  //   console.log(activities.find((activity) => activity._id));
  const activity = activities.find(
    (activity) => activity._id === Number(activityId)
  );
  console.log(activity);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={activity.image} alt={activity.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{activity.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={activity.rating}
                text={`${activity.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${activity.price}</ListGroup.Item>
            <ListGroup.Item>Description: {activity.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${activity.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {activity.spotsLeft > 0
                      ? `${activity.spotsLeft} spots left`
                      : `${activity.spotsLeft} spots`}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={activity.spotsLeft === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ActivityScreen;
