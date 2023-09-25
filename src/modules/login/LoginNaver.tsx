// import axios from 'axios';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Modal from './modal/BasicModal';

/**
 * 네이버 OAuth 로그인
 * @author 김선규
 * @returns 네이버 로그인 버튼
 */
function LoginNaver() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModaled, setIsModaled] = useState(false);
  // const navigate = useNavigate();

  const getImageSrc = () =>
    isHovered
      ? `${process.env.PUBLIC_URL}/naverhover.png`
      : `${process.env.PUBLIC_URL}/naverButton.png`;

  const handleNaverLogin = () => {
    window.location.href =
      'https://nid.naver.com/oauth2.0/authorize?client_id=ukwEecKhMrJzOdjwpJfB&response_type=code&redirect_uri=http://localhost:8080/login/oauth2/code/naver';

    console.log(`모달있는곳${isModaled}`);

    // setIsModaled(true);

    // axios
    //   .get('http://localhost:8080/')
    //   .then((response) => {
    //     // 서버로부터의 응답 처리
    //     console.log(response.data);
    //     // navigate('/survey/main');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleNaverLogin}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
      >
        <img src={getImageSrc()} style={{ width: '40%' }} alt="대체_텍스트" />
      </button>
      {isModaled && <Modal onClose={() => setIsModaled(false)} />}
    </div>
  );
}

export default LoginNaver;
