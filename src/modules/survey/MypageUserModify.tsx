import React, { useState } from 'react';
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
import axios, { AxiosError } from 'axios';

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

  console.log(`닉네임 체크 여부: ${nicknameCheckResult}`);
  console.log(`isNicknameEmpty: ${isNicknameEmpty}`);

  const userNo = 3;

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/survey/main');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openFileInput = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const uploadImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const imageResponse = await axios.put(
          `http://localhost:8000/api/users/${userNo}/image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (imageResponse.data.success) {
          console.log('이미지 업로드 성공');
          alert('이미지가 성공적으로 수정되었습니다.');
          setSelectedFile(null);

          const updatedImageResponse = await axios.get(
            `http://localhost:8000/api/users/${userNo}`
          );

          if (updatedImageResponse.data.data) {
            setImagePreview(
              `http://localhost:8000/${updatedImageResponse.data.data}`
            );
          } else {
            setImagePreview('/broken-image.jpg');
          }
        } else {
          console.error('이미지 업로드 실패');
        }
      } catch (error) {
        console.error('이미지 업로드 오류:', error);
      }
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value);
    setIsNicknameEmpty(value.trim() === '');
    setIsNicknameChecked(false);
    console.log(`nickname: ${value}`);
  };

  const handleNicknameCheck = async () => {
    if (nickname.trim() === '') {
      alert('닉네임을 입력하세요.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/check-duplicate-nickname`,
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

  // 리액트 코드
  const updateNickname = async () => {
    if (nickname) {
      try {
        const requestBody = {
          userNo,
          userNickname: nickname,
        };

        const nicknameResponse = await axios.put(
          `http://localhost:8000/api/users/${userNo}/nickname`,
          requestBody
        );

        if (nicknameResponse.data.success) {
          console.log('닉네임 수정 성공');
          alert('닉네임이 성공적으로 수정되었습니다.');
          setNickname('');
        } else {
          console.error('닉네임 수정 실패');
        }
      } catch (error) {
        console.error('닉네임 수정 오류:', error);
      }
    }
  };

  const uploadImageAndNickname = async () => {
    if (
      (selectedFile && isNicknameChecked) ||
      (nickname && isNicknameChecked)
    ) {
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
      <h1>회원 정보 수정</h1>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 600,
        }}
      >
        <p className="profile-modify-title">Your Profile Picture</p>
        <div className="profile-modify-img-area">
          <Avatar
            src={imagePreview || undefined}
            sx={{
              width: 100,
              height: 100,
            }}
          />
          <Button
            variant="contained"
            disableElevation
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 90,
              height: 40,
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
          label="Nickname"
          defaultValue="Hello World"
          variant="filled"
          sx={{
            width: '265px',
          }}
        />
        <div className="profile-modify-input">
          <div className="input-container">
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                변경할 닉네임
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
                    >
                      확인
                    </Button>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
        </div>
        <div className="profile-modify-button">
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
            }}
            onClick={uploadImageAndNickname}
            disabled={!selectedFile && (isNicknameEmpty || !isNicknameChecked)}
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
            }}
            onClick={goBack}
          >
            돌아가기
          </Button>
        </div>
      </Box>
    </Container>
  );
}

export default MypageUserModify;
