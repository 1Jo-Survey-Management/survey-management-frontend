/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 사용자 정보 수정 페이지를 위한 컴포넌트입니다. 사용자는 자신의 프로필 이미지와 닉네임을 수정할 수 있습니다.
 *
 * @returns {React.ReactElement} 사용자 정보 수정 페이지 컴포넌트를 렌더링하는 React 엘리먼트
 * @author 박창우
 */
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import axios from '../../../login/components/customApi';

function MypageUserModify() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    '/broken-image.jpg'
  );
  const [nickname, setNickname] = useState('');
  const [nicknameCheckResult, setNicknameCheckResult] = useState<string | null>(
    ''
  );

  const [isNicknameEmpty, setIsNicknameEmpty] = useState(true);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const [userData, setUserData] = useState({
    userNo: null,
    userNickname: '',
    userImage: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users/user-info`
        );

        if (response.status === 200) {
          const { userNickname, userImage, userNo } = response.data;

          const imageURL = 'http://localhost:8080/api/users/image';
          setUserData({ userNickname, userImage, userNo });
          setImagePreview(imageURL);
        }
      } catch (error) {
        console.error('유저 정보 불러오기 오류: ', error);
      }
    };
    fetchUserData();
  }, []);

  /**
   * 이전 페이지로 돌아가는 함수입니다.
   * 취소 버튼을 클릭하면 실행됩니다.
   */
  const goBack = () => {
    navigate('/survey/main');
  };

  /**
   * 사용자가 파일 선택 입력란에서 파일을 선택했을 때 호출되는 이벤트 핸들러입니다.
   * 선택된 이미지 파일을 상태에 설정하고 미리보기 URL을 생성합니다.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - 파일 선택 이벤트
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /**
   * 파일 선택 입력란을 열어 사용자가 이미지 파일을 선택할 수 있도록 합니다.
   */
  const openFileInput = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  /**
   * 선택된 이미지 파일을 서버로 업로드합니다.
   */
  const uploadImage = async () => {
    if (selectedFile && userData.userNo) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const imageResponse = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/users/${userData.userNo}/image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (imageResponse.data.success) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/users/${userData.userNo}`
          );

          const imageBox = response.data.userImage;

          const imageURL = `http://localhost:3000/images/${imageBox
            .split('\\')
            .pop()}`;

          setImagePreview(imageURL);

          console.log('이미지 업로드 성공');
          Swal.fire({
            icon: 'success',
            title: '이미지가 성공적으로 수정되었습니다!',
          });
          setSelectedFile(null);
        } else {
          console.error('이미지 업로드 실패');
        }
      } catch (error) {
        console.error('이미지 업로드 오류:', error);
      }
    }
  };

  /**
   * 닉네임 입력란의 값이 변경될 때마다 호출되어 닉네임 상태를 업데이트합니다.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - 입력 이벤트 객체
   */
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value);
    setIsNicknameEmpty(value.trim() === '');
    setIsNicknameChecked(false);
  };

  /**
   * 닉네임 중복 검사를 요청하는 함수입니다.
   * 서버에 닉네임 중복 검사를 요청하고 결과에 따라 상태를 업데이트합니다.
   */
  const handleNicknameCheck = async () => {
    if (nickname.trim() === '') {
      alert('닉네임을 입력하세요.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/check-duplicate-nickname`,
        { userNickname: nickname }
      );

      if (response.status === 200) {
        if (response.data === 'Nickname is available') {
          setNicknameCheckResult('사용 가능한 닉네임입니다.');
          setIsNicknameChecked(true);
          window.alert('사용 가능한 닉네임입니다.');
          setIsNicknameEmpty(false);
        } else {
          setNicknameCheckResult('이미 사용 중인 닉네임입니다.');
          setIsNicknameChecked(false);
          window.alert('이미 사용 중인 닉네임입니다.');
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 409) {
          setNicknameCheckResult('이미 사용 중인 닉네임입니다.');
          window.alert('이미 사용 중인 닉네임입니다.');
          setIsNicknameChecked(false);
        }
      }
    }
  };

  /**
   * 새로운 닉네임을 서버로 업데이트하는 함수입니다.
   */
  const updateNickname = async () => {
    if (nickname) {
      try {
        const requestBody = {
          userNickname: nickname,
        };

        const nicknameResponse = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/users/nickname`,
          requestBody
        );

        if (nicknameResponse.data.success) {
          console.log('닉네임 수정 성공');
          Swal.fire({
            icon: 'success',
            title: '닉네임이 성공적으로 수정되었습니다!',
          });
          setUserData({ ...userData, userNickname: nickname });
          localStorage.setItem('userNickname', nickname);

          setNickname('');
        } else {
          console.error('닉네임 수정 실패');
        }
      } catch (error) {
        console.error('닉네임 수정 오류:', error);
      }
    }
  };

  /**
   * 이미지와 닉네임을 업로드합니다.
   * 사용자가 업로드 버튼을 클릭하면 실행되며, 입력된 데이터의 유효성을 검사한 후 업로드를 수행합니다.
   */
  const uploadImageAndNickname = async () => {
    if ((selectedFile && isNicknameEmpty) || (nickname && isNicknameChecked)) {
      if (selectedFile) {
        await uploadImage();
      }
      if (nickname) {
        await updateNickname();
      }
    } else {
      alert('업로드 또는 확인 버튼을 누르고 수정을 눌러주세요.');
    }
  };

  return (
    <Container maxWidth="md">
      <h1
        style={{
          fontSize: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        회원 정보 수정
      </h1>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
          height: 500,
        }}
      >
        <p
          className="profile-modify-title"
          style={{
            fontWeight: 600,
            width: '100%',
            height: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
          }}
        >
          Your Profile Picture
        </p>
        <div
          className="profile-modify-img-area"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '265px',
            height: '200px',
            backgroundColor: '#ebebeb',
            borderRadius: '20px',
          }}
        >
          <Avatar
            src={imagePreview || undefined}
            sx={{
              width: 120,
              height: 120,
            }}
          />
          <Button
            variant="contained"
            disableElevation
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 80,
              height: 35,
              fontWeight: 600,
              border: '1px solid white',
            }}
            onClick={openFileInput}
          >
            업로드
          </Button>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
        </div>
        <TextField
          disabled
          id="filled-disabled"
          label={userData.userNickname}
          variant="filled"
          sx={{
            width: '30ch',
          }}
        />
        <div className="profile-modify-input">
          <div className="input-container">
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                변경할 닉네임을 입력
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={nickname}
                onChange={handleNicknameChange}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      onClick={handleNicknameCheck}
                      disabled={isNicknameEmpty}
                      sx={{
                        fontSize: '16px',
                      }}
                    >
                      확인
                    </Button>
                  </InputAdornment>
                }
                label="Password"
                sx={{
                  height: '55px',
                }}
              />
            </FormControl>
          </div>
        </div>
        <div
          className="profile-modify-button"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '265px',
          }}
        >
          <Button
            variant="contained"
            disableElevation
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 120,
              height: 40,
              border: '1px solid white',
              fontWeight: 600,
            }}
            onClick={uploadImageAndNickname}
            disabled={
              (!selectedFile && isNicknameEmpty) ||
              (!isNicknameEmpty && !isNicknameChecked)
            }
          >
            수정하기
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 120,
              height: 40,
              border: '1px solid white',
              fontWeight: 600,
            }}
            onClick={goBack}
          >
            취소
          </Button>
        </div>
      </Box>
    </Container>
  );
}

export default MypageUserModify;
