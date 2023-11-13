import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, ListGroup, Form, Container } from "react-bootstrap";
import google from "../img/google-icon.png";
import naver from "../img/naver-icon.jpg";
import kakao from "../img/kakao-icon.png";
import "../css/Login.css";

const Login = () => {
  
  // 카카오 로그인 클릭
  // 23-11-13 오전 9:45 박지훈 작성
  const kakaoLoginClick = ()=>{
    let REST_API_KEY = process.env.REACT_APP_KAKAO_REST_KEY;  
    let REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const kakaoToken = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoToken
  }

  // 네이버 로그인 클릭
  const naverLoginClick = ()=>{
    console.log('naver')
  }

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div style={{ width: "500px" }}>
          <Form>
            <Form.Group className="mb-4">
              <h2>딸깍</h2>
            </Form.Group>

            <Form.Group className="mb-3 email-input" controlId="formGroupEmail">
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3 email-input" controlId="formGroupPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Link className="d-grid gap-2">
                <Button className="login-btn" variant="dark">Login</Button>
              </Link>
            </Form.Group>

            <Form.Group className="mb-3">
              <Link to="/join">
                <span className="text-btn">회원가입</span>
              </Link>
              <Link to="/join">
                <span className="text-btn">ID찾기</span>
              </Link>

              <Link to="/join">
                <span className="text-btn">비밀번호 찾기</span>
              </Link>
            </Form.Group>
            <Form.Group className="mb-3">
              <ListGroup className="login-box mb-3" variant="flush">
                <ListGroup.Item>
                  <img className="login-logo" src={google} alt="" />
                  <span>Google 계정으로 로그인</span>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="login-box mb-3" variant="flush">
                <ListGroup.Item onClick={naverLoginClick}>
                  <img className="login-logo naver" src={naver} alt="" />
                  <span>Naver 계정으로 로그인</span>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="login-box mb-3" variant="flush">
                <ListGroup.Item onClick={kakaoLoginClick}>
                  <img className="login-logo" src={kakao} alt="" />
                  <span>Kakao 계정으로 로그인</span>
                </ListGroup.Item>
              </ListGroup>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
