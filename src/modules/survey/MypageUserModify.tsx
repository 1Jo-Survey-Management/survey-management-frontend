import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import axios from 'axios';

function MypageUserModify() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    '/broken-image.jpg'
  );
  const [nickname, setNickname] = useState('');

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
        // 이미지 업로드 API 호출
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

          // 이미지 업로드 후 이미지 미리보기 업데이트
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

  // 리액트 코드
  const updateNickname = async () => {
    if (nickname) {
      try {
        const requestBody = {
          userNo,
          userNickName: nickname,
        };

        // 닉네임 수정 API 호출
        const nicknameResponse = await axios.put(
          `http://localhost:8000/api/users/${userNo}/nickname`,
          requestBody // 수정한 닉네임을 요청에 포함
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
    if (selectedFile || nickname) {
      if (selectedFile) {
        await uploadImage(); // 이미지 업로드 호출
      }
      if (nickname) {
        await updateNickname(); // 닉네임 수정 호출
      }
    } else {
      alert('이미지 또는 닉네임을 입력하세요.');
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
        <div className="profile-modify-input">
          <div className="input-container">
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                변경할 닉네임
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Button onClick={updateNickname}>확인</Button>
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
