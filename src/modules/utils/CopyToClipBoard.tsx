/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import { Alert, Fade, Input, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { css, keyframes } from '@emotion/react';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const styles = {
  //   alertStyle = css({
  //     animationName,
  //   }),

  copyBox: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};

interface CopyToClipBoardProps {
  copyText: string;
}

const handleCopyToClipBoard = async (copyText: string) => {
  try {
    await navigator.clipboard.writeText(copyText);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default function CopyToClipBoard({ copyText }: CopyToClipBoardProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopyClick = async () => {
    const success = await handleCopyToClipBoard(copyText);

    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } else {
      setCopyFailed(true);
      setTimeout(() => {
        setCopyFailed(false);
      }, 2000);
    }
  };

  return (
    <Box>
      <Box>
        <Typography>공유하기</Typography>
        <Box css={styles.copyBox}>
          <TextField
            id="outlined-read-only-input"
            defaultValue={copyText}
            InputProps={{
              readOnly: true,
            }}
          />
          <ContentCopyIcon onClick={handleCopyClick} />
        </Box>
      </Box>
      {copied && (
        // <Alert
        //   severity="info"
        //   css={{
        //     opacity: 0,
        //     animation: `${fadeOut} 2s`, // fadeOut 애니메이션 적용
        //   }}
        // >
        //   복사 완료! 잠시 후 사라집니다.
        // </Alert>
        <Fade in={copied}>
          <Alert severity="info">복사 완료! 잠시 후 사라집니다.</Alert>
        </Fade>
      )}
      {copyFailed && (
        <Fade in={copyFailed}>
          <Alert severity="error">복사 실패! 잠시 후 사라집니다.</Alert>
        </Fade>
      )}
    </Box>
  );
}
