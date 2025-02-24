import { Row, Col } from "react-bootstrap";
import Activity from "../components/feature-specific/Activity.component.jsx";
import { useParams } from "react-router-dom";
import activities from "../activities.js";
import { useGetActivitiesQuery } from "../slices/activitiesApi.slice.js";
import Loader from "../components/common/Loader.component.jsx";
import Message from "../components/common/Message.component.jsx";

const HomeScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetActivitiesQuery({ pageNumber });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Featured Events</h1>
          <Row>
            {data.activities.map((activity) => (
              <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
                <Activity activity={activity} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
