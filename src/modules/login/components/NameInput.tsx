import * as React from 'react';
import { useState, ChangeEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import axios from '../components/customApi';
import { Container } from '@mui/system';

interface InputNickNameProps {
  onChange: (value: string, isChecked: boolean) => void;
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

  useEffect(() => {
    setIsNicknameChecked(false);
    setSubmitWithoutCheck(false);
    setNicknameCheckResult(null);
  }, [nickName]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickName(value);

    if (value.trim() === '' || value.trim() === null) {
      setError(true);
    } else {
      setError(false);
    }

    onChange(value, isNicknameChecked);
  };

  const handleNicknameSubmit = async () => {
    if (nickName.trim() === '') {
      setSubmitWithoutCheck(false);
      alert('닉네임을 입력하세요!');
      return;
    }

    try {
      const response = await axios.post(
        '/api/oauthLogin/check-duplicate-nickname',
        {
          userNickname: nickName,
        }
      );

      if (response.status === 200) {
        if (response.data === 'Nickname is available') {
          setNicknameCheckResult('사용 가능한 닉네임입니다.');
          setIsNicknameChecked(true);
        }
        if (response.data === 'Nickname is not available') {
          setNicknameCheckResult('이미 사용 중인 닉네임입니다.');
          setIsNicknameChecked(false);
        }
      }
    } catch (submitError) {
      console.error('Error checking nickname:', submitError);
    }
  };

  return (
    <Container
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}
    >
      <Box>
        <FormControl variant="standard" sx={{ padding: 0 }}>
          <InputLabel htmlFor="component-helper">
            닉네임을 입력하세요
          </InputLabel>
          <Input
            id="component-helper"
            aria-describedby="component-helper-text"
            value={nickName}
            onChange={handleInputChange}
            error={error}
          />
          {!error && nicknameCheckResult && (
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
    </Container>
  );
}
