"use client";

import { Container, Row, Col } from "react-bootstrap";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


export default function Home() {
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(setHeaderData({ title: "Home", subtitle: "Welcome to Maiacare" }));
  }, [dispatch]); // ✅ Run once after initial render

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
