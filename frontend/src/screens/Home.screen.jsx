import { Row, Col } from "react-bootstrap";
import Activity from "../components/feature-specific/Activity.component.jsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import activities from "../activities.js";
import { useGetActivitiesQuery } from "../slices/activitiesApi.slice.js";
import Loader from "../components/common/Loader.component.jsx";
import Message from "../components/common/Message.component.jsx";

import Paginate from "../components/common/Paginate.component.jsx";

import ActivityCarousel from "../components/feature-specific/ActivityCarousel.component.jsx";
import Meta from "../components/common/Meta.component.jsx";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetActivitiesQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {!keyword ? (
        <ActivityCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Featured Events</h1>
          <Row>
            {data.activities.map((activity) => (
              <Col key={activity._id} sm={12} md={6} lg={4} xl={3}>
                <Activity activity={activity} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
