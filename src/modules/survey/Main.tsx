// Main.tsx
import React from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';

function Main() {
  const test = () => {
    window.location.href = 'http://localhost:8080/logout';
  };

  // OAuth 2.0 토큰
  // const accessToken = ''; // 획득한 토큰을 여기에 설정

  // // Axios 요청 설정
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // };

  const test2 = () => {
    const accessToken = '';

    axios
      .post('http://localhost:8080/login/go', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // 서버로부터의 응답 처리
        const respData = response.data;
        console.log(`돌아오는 토큰 : ${respData}`);

        if (respData === '') {
          console.log('돌아오는 토큰 없담마');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container maxWidth="md">
      <button type="button" onClick={test}>
        로그아웃
      </button>
      <button type="button" onClick={test2}>
        토큰테스트
      </button>
      <h1>This is main</h1>
    </Container>
  );
}

export default Main;
