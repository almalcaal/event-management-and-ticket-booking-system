import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Activity from "../components/feature-specific/Activity.component.jsx";
import activities from "../activities.js";
import axios from "axios";

const HomeScreen = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data } = await axios.get("/api/activities");
      setActivities(data);
    };

    fetchActivities();
  }, []);

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
