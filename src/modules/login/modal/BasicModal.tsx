import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import axios from '../components/customApi';
import RadioButton from '../components/RowRadioButtonsGroup';
import InputNickName from '../components/NameInput';
import GetBirth from '../components/BasicDatePicker';
import StyledButton from '../components/StyledButton';

const boxStyle = {
  width: 400,
};

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

const webStyle = {
  '@media (max-width: 400px)': {
    width: '50%',
    height: 'auto',
  },
};

const webTitleFontSize = {
  '@media (max-width: 400px)': {
    fontSize: '20px',
  },
};

const webSubFontSize = {
  mt: 2,
  '@media (max-width: 400px)': {
    fontSize: '10px',
  },
};

const columnStyle = {
  display: 'flex',
};

const emptyBoxSimple = {
  height: 20,
  '@media (max-width: 400px)': {
    height: 0,
  },
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
  isNicknameChecked: false;
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
    isNicknameChecked: false,
  });

  const handleNickNameChange = (value: string) => {
    // const { userNickname, isNicknameChecked } = value;
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
    onClose();
    setOpen(false);
  };

  const handleSubmit = () => {
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
      axios
        .post('/api/oauthLogin/regist', userInfo, {
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
    } else {
      alert('정보를 정확히 입력해주세요!');
    }
  };

  const cancelSubmit = () => handleClose();

  return (
    <Box sx={boxStyle}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, ...webStyle }}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h1"
            sx={webTitleFontSize}
          >
            필수 추가 정보 입력
          </Typography>
          <Typography id="modal-modal-description" sx={webSubFontSize}>
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
    </Box>
  );
}
