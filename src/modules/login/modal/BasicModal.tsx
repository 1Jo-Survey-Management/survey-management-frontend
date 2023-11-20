import * as React from 'react';
import { useState } from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import axios from '../components/customApi';
import RadioButton from '../components/RowRadioButtonsGroup';
import InputNickName from '../components/NameInput';
import GetBirth from '../components/BasicDatePicker';
import StyledButton from '../components/StyledButton';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

const columnStyle = {
  display: 'flex',
};

interface ModalProps {
  onClose: () => void;
}

interface FormData {
  userBirth: string;
  userNickname: string;
  userGender: string;
  isNicknameCheckedOnChange: boolean;
}

/**
 * 최초 로그인 시 프로필 입력 받는 모달
 * @author 김선규
 * @param param0
 * @returns
 */
export default function BasicModal({ onClose }: ModalProps) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    userNickname: '',
    userGender: '',
    userBirth: '',
    isNicknameCheckedOnChange: false,
  });

  const handleNickNameChange = (value: string, isChecked: boolean) => {
    setFormData({
      ...formData,
      userNickname: value,
      isNicknameCheckedOnChange: isChecked,
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, userGender: value });
  };

  const handleBirthChange = (value: string) => {
    setFormData({ ...formData, userBirth: value });
  };

  const handleClose = () => {
    localStorage.removeItem('userNo');
    localStorage.removeItem('userNickname');
    localStorage.removeItem('userImage');
    onClose();
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (formData.isNicknameCheckedOnChange !== true) {
      alert('닉네임 중복체크를 해주세요!');
      return;
    }

    if (
      formData.userNickname !== '' &&
      formData.userBirth !== '' &&
      formData.userGender !== ''
    ) {
      const userInfo = {
        userNickname: formData.userNickname,
        userBirth: formData.userBirth,
        userGender: formData.userGender,
      };

      try {
        const response = await axios.post('/api/oauthLogin/regist', userInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const respData = response.data;
        if (respData === '') {
          console.error('API 요청 실패');
          return;
        }

        navigate(`/survey/main`);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('정보를 정확히 입력해주세요!');
    }
  };

  const cancelSubmit = async () => {
    try {
      const userNo = localStorage.getItem('userNo') ?? '';

      const response = await axios.get('/api/oauthLogin/cancel', {
        params: {
          userNo,
        },
      });

      const respData = response.data;
      if (respData === '') {
        console.error('API 요청 실패');
        return;
      }
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem('userNo');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');

    handleClose();
  };

  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            필수 추가 정보 입력
          </Typography>
          <Typography id="modal-modal-description">
            필수 추가 정보를 입력해야 회원가입이 가능합니다.
          </Typography>
          <InputNickName onChange={handleNickNameChange} />
          <RadioButton onChange={handleRadioChange} />
          <GetBirth onChange={handleBirthChange} />
          <Box sx={columnStyle}>
            <StyledButton buttonText="회원가입" onClick={handleSubmit} />
            <StyledButton buttonText="취소" onClick={cancelSubmit} />
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
