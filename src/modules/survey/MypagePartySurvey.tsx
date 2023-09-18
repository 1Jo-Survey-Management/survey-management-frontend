import React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Box from '@mui/material/Box';

function Mypage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/survey/main');
  };

  return (
    <Container maxWidth="md">
      <h1>내가 참여한 설문 목록</h1>

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
            src="/broken-image.jpg"
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
          >
            업로드
          </Button>
        </div>
        <div className="profile-modify-input">
          <div className="input-container">
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                변경할 닉네임
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <Button>확인</Button>
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
          >
            수정하기
          </Button>
        </div>
      </Box>

      <Button onClick={goBack}>돌아가기</Button>
    </Container>
  );
}

export default Mypage;
