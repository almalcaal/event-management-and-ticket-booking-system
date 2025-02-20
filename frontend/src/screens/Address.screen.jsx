import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/common/FormContainer.component.jsx";
import CheckoutSteps from "../components/feature-specific/CheckoutSteps.component.jsx";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveAddress } from "../slices/cart.slice.js";

const AddressScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { userAddress = {} } = cart;

  const [address, setAddress] = useState(userAddress?.address || "");
  const [city, setCity] = useState(userAddress?.city || "");
  const [postalCode, setPostalCode] = useState(userAddress?.postalCode || "");
  const [country, setCountry] = useState(userAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>Home Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter home address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AddressScreen;
