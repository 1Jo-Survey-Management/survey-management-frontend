import * as React from 'react';
// import ImageIcon from '@mui/icons-material/Image';
import { css } from '@emotion/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Avatar, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import axios from '../components/customApi';
import RadioButton from '../components/RowRadioButtonsGroup';
import InputNickName from '../components/NameInput';
import GetBirth from '../components/BasicDatePicker';
import StyledButton from '../components/StyledButton';
import { imageUploadToS3 } from '../../survey/creation/utils/ImageUploadUtil';

const styles = {
  container: css({
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
  }),

  columnStyle: css({
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'center',
    textAlign: 'center',
  }),

  iamgeBox: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #D1D1D1',
    height: '50px',
    marginBottom: '10px',
  }),

  noImageIcon: css({
    fontSize: '30px',
    color: '#757575',
  }),

  uploadImage: css({
    width: '50%',
    height: '50%',
    objectFit: 'contain',
  }),
};

interface ModalProps {
  onClose: () => void;
}

interface UserInfo {
  userBirth: string;
  userNickname: string;
  userGender: string;
  userImage?: string;
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

  const [imagePreview] = useState<string | null>('/broken-image.jpg');

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
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userNickname: '',
    userGender: '',
    userBirth: '',
    userImage: '',
    isNicknameCheckedOnChange: false,
    isOverLimitCheckedOnChange: false,
    isRegexCheckCheckedOnChange: false,
  });
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadFile = event.target.files && event.target.files[0];
    if (uploadFile) {
      const imageUrlString: string = URL.createObjectURL(uploadFile);
      setSelectedImage(imageUrlString);

      try {
        const imageUrl = await imageUploadToS3(uploadFile);
        setUserInfo({ ...userInfo, userImage: imageUrl });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNickNameChange = (
    value: string,
    isChecked: boolean,
    isOverLimitChecked: boolean,
    isRegexCheckChecked: boolean
  ) => {
    setUserInfo({
      ...userInfo,
      userNickname: value,
      isNicknameCheckedOnChange: isChecked,
      isOverLimitCheckedOnChange: isOverLimitChecked,
      isRegexCheckCheckedOnChange: isRegexCheckChecked,
    });
  };

  const handleRadioChange = (value: string) => {
    setUserInfo({ ...userInfo, userGender: value });
  };

  const handleBirthChange = (value: string) => {
    setUserInfo({ ...userInfo, userBirth: value });
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
    if (userInfo.isNicknameCheckedOnChange !== true) {
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

    if (userInfo.isOverLimitCheckedOnChange === true) {
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

    if (userInfo.userGender === '') {
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

    if (userInfo.userBirth === '') {
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

    if (userInfo.userBirth !== '' && userInfo.userGender !== '') {
      const userInfoRegist = {
        userNickname: userInfo.userNickname,
        userBirth: userInfo.userBirth,
        userGender: userInfo.userGender,
        userImage: userInfo.userImage,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/oauthLogin/regist`,
          userInfoRegist,
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
        <Box
          sx={{
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
          }}
        >
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
            }}
          >
            필수 추가 정보를 입력해야 회원가입이 가능합니다.
          </Typography>

          {!selectedImage && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100px',
                borderRadius: '20px',
              }}
            >
              <Avatar
                src={imagePreview || undefined}
                sx={{
                  width: 60,
                  height: 60,
                }}
              />
            </Box>
          )}
          {selectedImage && (
            <div>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  height: '100px',
                  borderRadius: '20px',
                }}
              >
                <Avatar
                  src={selectedImage || undefined}
                  sx={{
                    width: 80,
                    height: 80,
                  }}
                  id="surveyImage"
                  alt="설문 이미지"
                />
              </Box>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginLeft: '16px' }}
          />

          <InputNickName
            onChange={handleNickNameChange}
            isNicknameCheckedOnChangeCallback={(isChecked) =>
              setUserInfo({ ...userInfo, isNicknameCheckedOnChange: isChecked })
            }
            isOverLimitChecked={(isOverLimitChecked) =>
              setUserInfo({
                ...userInfo,
                isOverLimitCheckedOnChange: isOverLimitChecked,
              })
            }
            isRegexCheckChecked={(isRegexCheckChecked) =>
              setUserInfo({
                ...userInfo,
                isRegexCheckCheckedOnChange: isRegexCheckChecked,
              })
            }
          />
          <RadioButton onChange={handleRadioChange} />
          <GetBirth onChange={handleBirthChange} />
          <Box css={styles.columnStyle}>
            <StyledButton buttonText="회원가입" onClick={handleSubmit} />
            <StyledButton buttonText="취소" onClick={cancelSubmit} />
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
