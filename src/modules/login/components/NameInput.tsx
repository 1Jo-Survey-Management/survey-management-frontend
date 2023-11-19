import * as React from 'react';
import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import axios from '../components/customApi';

interface InputNickNameProps {
  onChange: (value: string) => void;
}

// interface FormData {
//   userNickname: string;
//   isNicknameChecked: boolean;
// }

/**
 * 닉네임을 입력할수 있는 input box 입니다
 * @author 김선규
 * @returns 닉네임 입력 컴포넌트
 */
export default function ComposedTextField({ onChange }: InputNickNameProps) {
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [nicknameCheckResult, setNicknameCheckResult] = useState<string | null>(
    ''
  );
  const [nickName, setNickName] = useState<string>('');
  const [error, setError] = useState(true);
  const [submitWithoutCheck, setSubmitWithoutCheck] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickName(value);

    // const formData: FormData = {
    //   userNickname: value,
    //   isNicknameChecked: value.trim() !== '' && value.trim() !== null,
    // };

    if (value.trim() === '' || value.trim() === null) {
      setError(true);
    } else {
      setError(false);
    }

    onChange(value);
  };

  const handleNicknameSubmit = async () => {
    if (nickName.trim() === '') {
      setSubmitWithoutCheck(false);
      alert('닉네임을 입력하세요!');
      return;
    }

    try {
      const response = await axios.post('/api/users/check-duplicate-nickname', {
        userNickname: nickName,
      });

      if (response.status === 200) {
        if (response.data === 'Nickname is available') {
          setNicknameCheckResult('사용 가능한 닉네임입니다.');
          setIsNicknameChecked(true);
        } else {
          setNicknameCheckResult('이미 사용 중인 닉네임입니다.');
          setIsNicknameChecked(false);
        }
      }
    } catch (submitError) {
      console.error('Error checking nickname:', submitError);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">닉네임을 입력하세요</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          value={nickName}
          onChange={handleInputChange}
          error={error}
        />
        {!error && isNicknameChecked && (
          <FormHelperText id="component-helper-text">
            {nicknameCheckResult}
          </FormHelperText>
        )}

        {!submitWithoutCheck && (
          <FormHelperText id="component-helper-text" error>
            중복확인을 하지 않았습니다!
          </FormHelperText>
        )}

        <Button
          onClick={() => {
            setSubmitWithoutCheck(true);
            handleNicknameSubmit();
          }}
          variant="contained"
          color="primary"
        >
          중복확인
        </Button>
      </FormControl>
    </Box>
  );
}
