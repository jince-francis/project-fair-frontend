import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  const existingUsers = JSON.parse(sessionStorage.getItem("existingUsers"));
  const username = existingUsers?.username || "user";

  return (
    <>
      <Header />
      <div className="p-4 mt-5">
        <h3 className='mt-5'>Welcome <span className='text-warning'>{username}</span></h3>



        <Container>
          <Row>

            <Col sm={12} md={8}>
              <MyProject />
            </Col>

            <Col sm={12} md={4}>
              <Profile />
            </Col>

          </Row>
        </Container>
      </div>
    </>
  )
}

export default Dashboard