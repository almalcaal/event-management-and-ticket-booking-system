import { Row, Col } from "react-bootstrap";
import Activity from "../components/feature-specific/Activity.component.jsx";
import activities from "../activities.js";

const HomeScreen = () => {
  return (
    <>
      <h1>Featured Events</h1>
      <Row>
        {activities.map((activity) => (
          <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
            <Activity activity={activity} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
