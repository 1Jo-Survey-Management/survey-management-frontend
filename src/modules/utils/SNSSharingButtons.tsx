/** @jsxImportSource @emotion/react */

import React from 'react';
import { Box, Button } from '@mui/material';
import { css } from '@emotion/react';
import useSNSShare from './SNSSharing';

export default function SNSSharingButtons() {
  const {
    isAvailNavigator,
    shareToTwitter,
    shareToFacebook,
    shareToKakaoTalk,
    shareToNaver,
    shareToNavigator,
  } = useSNSShare({
    shareTitle: 'My Share Title',
    shareUrl: 'https://example.com',
  });

  return (
    <div>
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Button onClick={shareToTwitter}>Share on Twitter</Button>
        <Button onClick={shareToFacebook}>Share on Facebook</Button>
        <Button onClick={shareToKakaoTalk}>Share on KakaoTalk</Button>
        <Button onClick={shareToNaver}>Share on Naver</Button>
      </Box>
      {isAvailNavigator && (
        <Button onClick={() => shareToNavigator()}>Share via Navigator</Button>
      )}
    </div>
  );
}
