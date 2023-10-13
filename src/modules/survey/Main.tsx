<<<<<<< HEAD
import React, { useEffect } from 'react';
=======
import React from 'react';
>>>>>>> 68c4604995063ab70fb46c3b5ad4290bb09a927e
import Container from '@mui/material/Container';
import axios from '../login/components/customApi';
import CountdownTimer from '../login/components/CountdownTimer';
import moment from 'moment';

<<<<<<< HEAD
/**
 * 메인 함수 테스트(병합시 제거 예정)
 * @author 김선규
 */
function Main() {
  const test = () => {
    axios
      .post('/user/go')
      .then((response) => {
        // 서버로부터의 응답 처리
        const respData = response.data;
        console.log(`API 요청 : ${JSON.stringify(respData, null, 2)}`);

        if (respData === '') {
          console.log('API 요청 실패');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const tokenExpires = () => {
    const expiresInString = localStorage.getItem('expiresIn');
    const expiresInDate = expiresInString ? moment(expiresInString) : null;

    console.log('expiresin : ' + expiresInString);

    {
      expiresInDate ? (
        <CountdownTimer targetDate={expiresInDate}></CountdownTimer>
      ) : (
        console.log('no expiresInDate in')
      );
    }
  };

=======
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Main() {
  const navigate = useNavigate();
  const goAttend = () => {
    navigate('/survey/Attend');
  };
>>>>>>> 68c4604995063ab70fb46c3b5ad4290bb09a927e
  return (
    <Container maxWidth="md">
      <button type="button" onClick={test}>
        API 요청
      </button>
      <button type="button" onClick={tokenExpires}>
        토큰유효시간
      </button>
      <h1>This is main</h1>
      <Button onClick={goAttend}>참여하기 버튼</Button>
    </Container>
  );
}

export default Main;
