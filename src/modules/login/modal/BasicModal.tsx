import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
  birth: string;
  nickName: string;
  radioValue: string;
}

/**
 * 최초 로그인 시 프로필 입력 받는 모달
 * @author 김선규
 * @param param0
 * @returns
 */
export default function BasicModal({ onClose }: ModalProps) {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nickName: '',
    radioValue: '',
    birth: '',
  });

  // 각 입력 필드에 대한 데이터 업데이트 함수
  const handleNickNameChange = (value: string) => {
    setFormData({ ...formData, nickName: value });
  };

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, radioValue: value });
  };

  const handleBirthChange = (value: string) => {
    setFormData({ ...formData, birth: value });
  };

  const handleClose = () => {
    onClose(); // onClose 함수를 호출하여 모달을 닫음
    setOpen(false); // 모달 상태를 닫힌 상태로 업데이트
  };

  console.log(open);

  // 폼 제출 핸들러
  const handleSubmit = () => {
    // TODO : 입력된 프로필 데이터 + 토큰 가지고 회원가입
    // Order : axios로 로그인(요청) -> Oauth로그인후 첫로그인이면 flag=false 와 함께 첫프로필 모달 호출(응답)
    //                             -> flag=true 만 돌아오고 다음페이지 접근가능(응답)

    console.log(formData);

    // axios
    //   .get('http://localhost:8080/login/회원가입시킬메서드')
    //   .then((response) => {
    //     // 서버로부터의 응답 처리
    //     console.log(response.data);
    //     <Modal />;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const cancelSubmit = () => {
    console.log('회원가입 안함');
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
