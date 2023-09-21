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
  border: '2px solid #000',
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

// onClose props에 대한 타입 지정
interface ModalProps {
  onClose: () => void;
}

export default function BasicModal({ onClose }: ModalProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    onClose(); // onClose 함수를 호출하여 모달을 닫음
    setOpen(false); // 모달 상태를 닫힌 상태로 업데이트
  };

  console.log(open);

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
          <InputNickName />
          <Box sx={emptyBoxSimple}> </Box>
          <RadioButton />
          <Box sx={emptyBoxSimple}> </Box>
          <GetBirth />
          <Box sx={emptyBox}> </Box>
          <Box sx={columnStyle}>
            <StyledButton buttonText="회원가입" />
            <StyledButton buttonText="취소" />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
