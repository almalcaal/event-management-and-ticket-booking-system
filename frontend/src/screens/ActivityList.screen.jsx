import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Message from "../components/common/Message.component.jsx";
import Loader from "../components/common/Loader.component.jsx";
import {
  useGetActivitiesQuery,
  useCreateActivityMutation,
  useDeleteActivityMutation,
} from "../slices/activitiesApi.slice.js";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

const ActivityListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetActivitiesQuery({
    pageNumber,
  });

  const [createActivity, { isLoading: loadingCreate }] =
    useCreateActivityMutation();

  const createActivityHandler = async () => {
    if (window.confirm("Are you sure you want to create a new activity?")) {
      try {
        await createActivity();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const [deleteActivity, { isLoading: loadingDelete }] =
    useDeleteActivityMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteActivity(id);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Activities</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createActivityHandler}>
            <FaPlus /> Create Activity
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}

      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>COMPANY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity._id}</td>
                  <td>{activity.name}</td>
                  <td>${activity.price}</td>
                  <td>{activity.category}</td>
                  <td>{activity.company}</td>
                  <td>
                    <LinkContainer to={`/admin/activity/${activity._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(activity._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* PAGINATE PLACEHOLDER */}
        </>
      )}
    </>
  );
};

export default ActivityListScreen;
