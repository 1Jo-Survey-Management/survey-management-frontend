// Main.tsx
import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import axios from 'axios';

function Main() {
  /**
   * 로그인시 리다이렉트가 메인으로 되는데 메인에서 로그인 성공시 돌아오는
   * accessToken에 대하여 상태 저장후 요청시 자동으로 헤더에 담길 수
   * 있게 끔 한다. 다만, 아직 localstorge나 cookie 등에는 저장하지
   * 않고 차후 전략을 선택하여 개발하도록 한다.
   * @author 김선규
   */

  // const location = useLocation();
  // const navigate = useNavigate();

  // 회원이 존재했을때 url parm 검사 해서 토큰, 유저번호 있으면 axois 헤더 default 설정해줌
  // (보안이슈) 아무 토큰과 번호를 url로 입력해서 프론트 서버 url로 접근시 보안 불가
  // useEffect(() => {
  //   // URL에서 'accessToken' 파라미터 추출
  //   const searchParams = new URLSearchParams(location.search);
  //   const accessToken = searchParams.get('accessToken');
  //   const userNo = searchParams.get('userNo');

  //   // 액세스 토큰이랑 회원번호 둘 다 있으면 회원 존재
  //   if (accessToken && userNo) {
  //     console.log('AccessToken:', accessToken);
  //     console.log('userNo : ', userNo);

  //     // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
  //     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //     axios.defaults.headers.common['X-User-No'] = userNo;
  //   } else {
  //     // accessToken이 존재하지 않으면 로그인 화면으로 복귀(보안)
  //     navigate('/');
  //   }
  // }, [location]);

  /**
   * 로그아웃 테스트
   */
  const test = () => {
    window.location.href = 'http://localhost:8080/logout';
  };

  /**
   * API 호출 테스트
   */
  const test2 = () => {
    axios
      .post('http://localhost:8080/login/go')
      .then((response) => {
        // 서버로부터의 응답 처리
        const respData = response.data;
        console.log(`API 요청 : ${respData}`);

        if (respData === '') {
          console.log('API 요청 실패');
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
        API 요청
      </button>
      <h1>This is main</h1>
    </Container>
  );
}

export default Main;
