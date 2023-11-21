import * as React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
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
  border: '1px solid #000',
  boxShadow: '0 0 0 1px black, 0 0 0 5px white, 0 0 0 1px black',
  p: 2,
  borderRadius: '10px',
};

const columnStyle = {
  display: 'flex',
  marginTop: '20px',
  justifyContent: 'center',
  textAlign: 'center',
};

interface ModalProps {
  onClose: () => void;
}

interface FormData {
  userBirth: string;
  userNickname: string;
  userGender: string;
  isNicknameCheckedOnChange: boolean;
  isOverLimitCheckedOnChange: boolean;
  isRegexCheckCheckedOnChange: boolean;
}

/**
 * 최초 로그인 시 프로필 입력 받는 모달
 * @author 김선규
 * @param param0
 * @returns
 */
export default function BasicModal({ onClose }: ModalProps) {
  const navigate = useNavigate();

  // style 태그를 사용해 커스텀 스타일 정의
  const customStyles = `
    .swal-custom-popup {
      z-index: 1500; // 필요한 z-index 값
    }
    .swal-custom-container {
      z-index: 1500; // 필요한 z-index 값
    }
  `;

  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    userNickname: '',
    userGender: '',
    userBirth: '',
    isNicknameCheckedOnChange: false,
    isOverLimitCheckedOnChange: false,
    isRegexCheckCheckedOnChange: false,
  });

  const handleNickNameChange = (
    value: string,
    isChecked: boolean,
    isOverLimitChecked: boolean,
    isRegexCheckChecked: boolean
  ) => {
    setFormData({
      ...formData,
      userNickname: value,
      isNicknameCheckedOnChange: isChecked,
      isOverLimitCheckedOnChange: isOverLimitChecked,
      isRegexCheckCheckedOnChange: isRegexCheckChecked,
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userNickname');
    localStorage.removeItem('userImage');
    localStorage.removeItem('expiresIn');
    onClose();
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (formData.isNicknameCheckedOnChange !== true) {
      Swal.fire({
        icon: 'error',
        title: '닉네임 중복체크 해주세요!',
        customClass: {
          popup: 'swal-custom-popup',
          container: 'swal-custom-container',
        },
      });
      return;
    }

    if (formData.isOverLimitCheckedOnChange === true) {
      Swal.fire({
        icon: 'error',
        title: '닉네임은 16자 이내로 해주세요!',
        customClass: {
          popup: 'swal-custom-popup',
          container: 'swal-custom-container',
        },
      });
      return;
    }

    if (formData.userGender === '') {
      Swal.fire({
        icon: 'error',
        title: '성별을 선택해주세요!',
        customClass: {
          popup: 'swal-custom-popup',
          container: 'swal-custom-container',
        },
      });
      return;
    }

    if (formData.userBirth === '') {
      Swal.fire({
        icon: 'error',
        title: '생년월일을 입력해주세요!',
        customClass: {
          popup: 'swal-custom-popup',
          container: 'swal-custom-container',
        },
      });
      return;
    }

    if (formData.isRegexCheckCheckedOnChange === true) {
      Swal.fire({
        icon: 'error',
        title: '특수문자는 입력할 수 없습니다!',
        customClass: {
          popup: 'swal-custom-popup',
          container: 'swal-custom-container',
        },
      });
      return;
    }

    if (formData.userBirth !== '' && formData.userGender !== '') {
      const userInfo = {
        userNickname: formData.userNickname,
        userBirth: formData.userBirth,
        userGender: formData.userGender,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/oauthLogin/regist`,
          userInfo,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const respData = response.data;
        if (respData === '') {
          console.error('API 요청 실패');
          return;
        }

        const responseCheck = response;
        const responseUserNo = responseCheck.data.content.userNo;
        const responseAccessToken = responseCheck.data.content.accessToken;
        const responseImage = responseCheck.data.content.userImage;
        const responseNickName = responseCheck.data.content.userNickname;
        const responseExpiresIn = responseCheck.data.content.expiresIn;

        localStorage.setItem('userNo', responseUserNo);
        localStorage.setItem('userNickname', responseNickName);
        localStorage.setItem('userImage', responseImage);
        localStorage.setItem('accessToken', responseAccessToken);
        localStorage.setItem('expiresIn', responseExpiresIn);

        navigate(`/survey/main`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const cancelSubmit = async () => {
    try {
      const userNo = localStorage.getItem('userNo');

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/oauthLogin/cancel`,
        {
          params: {
            userNo,
          },
        }
      );

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
      <style>{customStyles}</style>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              padding: '16px',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            필수 추가 정보 입력
          </Typography>
          <Typography
            sx={{
              padding: '16px',
              fontSize: '0.7rem',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            필수 추가 정보를 입력해야 회원가입이 가능합니다.
          </Typography>
          <InputNickName
            onChange={handleNickNameChange}
            isNicknameCheckedOnChangeCallback={(isChecked) =>
              setFormData({ ...formData, isNicknameCheckedOnChange: isChecked })
            }
            isOverLimitChecked={(isOverLimitChecked) =>
              setFormData({
                ...formData,
                isOverLimitCheckedOnChange: isOverLimitChecked,
              })
            }
            isRegexCheckChecked={(isRegexCheckChecked) =>
              setFormData({
                ...formData,
                isRegexCheckCheckedOnChange: isRegexCheckChecked,
              })
            }
          />
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
