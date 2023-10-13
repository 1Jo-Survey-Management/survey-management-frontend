import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from '../components/customApi';
import { useNavigate } from 'react-router-dom';
import RadioButton from '../components/RowRadioButtonsGroup';
import InputNickName from '../components/NameInput';
import GetBirth from '../components/BasicDatePicker';
import StyledButton from '../components/StyledButton';
import { Moment } from 'moment';
import moment from 'moment';

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
    onClose();
    setOpen(false);
  };

  console.log(open);

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
            'Content-Type': 'application/json', // JSON 데이터 전송을 위한 헤더 설정
          },
        })
        .then((response) => {
          // 서버로부터의 응답 처리
          const respData = response.data;
          console.log(`API 요청 : ${JSON.stringify(respData, null, 2)}`);

          if (respData === '') {
            console.log('API 요청 실패');
          }

          navigate(`/survey/main`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const cancelSubmit = () => {
    console.log('회원가입 안함');

    // 여기에다 회원가입 안하면 안된다는 모달 띄움
    // 그 모달에서도 취소하면 토큰 취소하고 브라우저의 로그인 쿠키도 삭제

    // 회원가입 취소하면 회원가입하기 위해 만들어 두었던 데이터베이스 폼도 요청보내서 삭제
    // 발급 받았던 액세스 토큰도 삭제할 수 있으면 삭제

    // 미완성 PR이후 마지막으로 고쳐서 올리겠습니다..
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
