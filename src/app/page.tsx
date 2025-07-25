"use client";

import { Container, Row, Col } from "react-bootstrap";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  dispatch(setHeaderData({ title: "Home", subtitle: "Welcome to Maiacare" }));

  return (
    <Container>
      <Row>
        <Col xs={6} className="bg-success">
          <h1>Maicare</h1>
          {/* What is meaing of Maicare Bro !!!  It's Maiacare */}
        </Col>
        <Col xs={6} className="bg-danger">
          <h1>Doctor</h1>
        </Col>
      </Row>
    </Container>
  );
}
