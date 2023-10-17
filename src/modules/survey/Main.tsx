import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import axios from '../login/components/customApi';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

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
          alert('로그인이 필요합니다!');
          console.log('API 요청 실패');
        }
      })
      .catch((error) => {
        alert('로그인이 필요합니다!');
        console.error(error);
      });
  };

  const userProfile = () => {
    axios
      .post('/login/user')
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
  const navigate = useNavigate();
  const goAttend = () => {
    navigate('/survey/Attend');
  };
  return (
    <Container maxWidth="md">
      <button type="button" onClick={test}>
        API 요청
      </button>
      <button type="button" onClick={userProfile}>
        회원프로필요청
      </button>
      <h1>This is main</h1>
      <Button onClick={goAttend}>참여하기 버튼</Button>
    </Container>
  );
}

export default Main;
