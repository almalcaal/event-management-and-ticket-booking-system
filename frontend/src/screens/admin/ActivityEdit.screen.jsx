import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/common/Message.component.jsx";
import Loader from "../../components/common/Loader.component.jsx";
import FormContainer from "../../components/common/FormContainer.component.jsx";
import { toast } from "react-toastify";
import {
  useGetActivityDetailsQuery,
  useUpdateActivityMutation,
} from "../../slices/activitiesApi.slice.js";

const ActivityEditScreen = () => {
  const { id: activityId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [spotsLeft, setSpotsLeft] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: activity,
    isLoading,
    refetch,
    error,
  } = useGetActivityDetailsQuery(activityId);

  const [updateActivity, { isLoading: loadingUpdate }] =
    useUpdateActivityMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateActivity({
        activityId,
        name,
        price,
        image,
        company,
        category,
        description,
        spotsLeft,
      });
      toast.success("activity updated successfully");
      refetch();
      navigate("/admin/activitylist");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (activity) {
      setName(activity.name);
      setPrice(activity.price);
      setImage(activity.image);
      setCompany(activity.company);
      setCategory(activity.category);
      setSpotsLeft(activity.spotsLeft);
      setDescription(activity.description);
    }
  }, [activity]);

  return (
    <>
      <Link to="/admin/activitylist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Activity</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* IMAGE INPUT PLACEHOLDER */}

            <Form.Group controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="spotsLeft">
              <Form.Label>Spots Left</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter spotsLeft"
                value={spotsLeft}
                onChange={(e) => setSpotsLeft(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ActivityEditScreen;
