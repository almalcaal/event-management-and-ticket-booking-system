import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/feature-specific/CheckoutSteps.component.jsx";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.userAddress.address) {
      navigate("/address");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.userAddress.address, navigate]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>Column</Col>
        <Col md={4}>Column</Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
