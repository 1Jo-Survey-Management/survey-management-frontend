import * as React from 'react';
import { useState, ChangeEvent, useEffect } from 'react';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';
import axios from '../components/customApi';

interface InputNickNameProps {
  onChange: (value: string, isChecked: boolean, isOverLimited: boolean) => void;
}

interface isNicknameCheckedOnChange {
  isNicknameCheckedOnChangeCallback: (isChecked: boolean) => void;
}

interface isOverLimitCheckedOnChange {
  isOverLimitChecked: (isOverLimited: boolean) => void;
}
/**
 * 닉네임을 입력할수 있는 input box 입니다
 * @author 김선규
 * @returns 닉네임 입력 컴포넌트
 */
export default function ComposedTextField({
  onChange,
  isNicknameCheckedOnChangeCallback,
  isOverLimitChecked,
}: InputNickNameProps &
  isNicknameCheckedOnChange &
  isOverLimitCheckedOnChange) {
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [nicknameCheckResult, setNicknameCheckResult] = useState<string | null>(
    ''
  );
  const [nickName, setNickName] = useState<string>('');
  const [error, setError] = useState(true);
  const [submitWithoutCheck, setSubmitWithoutCheck] = useState(false);
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    setIsNicknameChecked(false);
    setSubmitWithoutCheck(false);
    setNicknameCheckResult(null);
  }, [nickName]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length <= 16) {
      setNickName(value);
      setIsOverLimit(false);
    } else {
      setIsOverLimit(true);
    }

    if (value.trim() === '' || value.trim() === null) {
      setError(true);
    } else {
      setError(false);
    }

    onChange(value, isNicknameChecked, isOverLimit);
  };

  useEffect(() => {
    isNicknameCheckedOnChangeCallback(isNicknameChecked);
    isOverLimitChecked(isOverLimit);
  }, [isNicknameChecked, isOverLimit]);

  const handleNicknameSubmit = async () => {
    if (nickName.trim() === '') {
      setSubmitWithoutCheck(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/oauthLogin/check-duplicate-nickname`,
        {
          userNickname: nickName,
        }
      );

      if (response.status === 200) {
        if (response.data === 'Nickname is available') {
          setNicknameCheckResult('사용 가능한 닉네임입니다.');
          setIsNicknameChecked(true);

          isNicknameCheckedOnChangeCallback(true);
        }
        if (response.data === 'Nickname is not available') {
          setNicknameCheckResult('이미 사용 중인 닉네임입니다.');
          setIsNicknameChecked(false);

          isNicknameCheckedOnChangeCallback(false);
        }
      }
    } catch (submitError) {
      console.error('Error checking nickname:', submitError);
    }
  };

  return (
    <Container
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'row', // 세로에서 가로로 변경
        alignItems: 'center', // 수직 가운데 정렬
        justifyContent: 'flex-start', // 수평 왼쪽 정렬
      }}
    >
      <Box>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-helper">닉네임</InputLabel>
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

          {isOverLimit && (
            <FormHelperText sx={{ color: 'red' }}>
              닉네임은 16자를 초과할 수 없습니다.
            </FormHelperText>
          )}

          {!submitWithoutCheck && !isOverLimit && (
            <FormHelperText id="component-helper-text" error>
              중복확인을 하지 않았습니다!
            </FormHelperText>
          )}
        </FormControl>

        <Button
          onClick={() => {
            setSubmitWithoutCheck(true);
            handleNicknameSubmit();
          }}
          variant="contained"
          color="secondary"
          sx={{ marginTop: '10px' }}
        >
          중복확인
        </Button>
      </Box>
    </Container>
  );
}
