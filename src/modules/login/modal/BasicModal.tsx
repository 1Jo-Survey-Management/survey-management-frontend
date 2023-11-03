import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import moment, { Moment } from 'moment';
import axios from '../components/customApi';
import RadioButton from '../components/RowRadioButtonsGroup';
import InputNickName from '../components/NameInput';
import GetBirth from '../components/BasicDatePicker';
import StyledButton from '../components/StyledButton';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

const columnStyle = {
  display: 'flex',
};

const emptyBoxSimple = {
  height: 20,
};

const emptyBox = {
  height: 50,
};

interface ModalProps {
  onClose: () => void;
}

interface FormData {
  userBirth: string;
  userNickname: string;
  userGender: string;
  expiresIn: Moment;
  refreshToken: string;
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
    expiresIn: moment(),
    refreshToken: '',
  });

  const handleNickNameChange = (value: string) => {
    setFormData({ ...formData, userNickname: value });
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
    localStorage.removeItem('accessToken');
    console.log('회원가입 취소');
    onClose();
    setOpen(false);
  };

  const handleSubmit = () => {
    if (
      formData.userNickname === '' ||
      formData.userBirth === '' ||
      formData.userGender === ''
    ) {
    } else {
      const userInfo = {
        userNickname: formData.userNickname,
        userBirth: formData.userBirth,
        userGender: formData.userGender,
        expiresIn: localStorage.getItem('expiresIn'),
        refreshToken: localStorage.getItem('refreshToken'),
      };
      axios
        .post('/login/regist', userInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const respData = response.data;
          if (respData === '') {
            console.error('API 요청 실패');
          }

          navigate(`/survey/main`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const cancelSubmit = () => {
    return handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            필수 추가 정보 입력
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            필수 추가 정보를 입력해야 회원가입이 가능합니다.
          </Typography>
          <Box sx={emptyBoxSimple}> </Box>
          <InputNickName onChange={handleNickNameChange} />
          <Box sx={emptyBoxSimple}> </Box>
          <RadioButton onChange={handleRadioChange} />
          <Box sx={emptyBoxSimple}> </Box>
          <GetBirth onChange={handleBirthChange} />
          <Box sx={emptyBox}> </Box>
          <Box sx={columnStyle}>
            <StyledButton buttonText="회원가입" onClick={handleSubmit} />
            <StyledButton buttonText="취소" onClick={cancelSubmit} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
