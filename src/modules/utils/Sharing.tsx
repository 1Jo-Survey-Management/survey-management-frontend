/** @jsxImportSource @emotion/react */

import { Box } from '@mui/system';
import React, { useState } from 'react';
import { css } from '@emotion/react';
import IosShareIcon from '@mui/icons-material/IosShare';
import ShareIcon from '@mui/icons-material/Share';
import { Button, Popover } from '@mui/material';
import { SNSSharingParams } from './SNSSharingType';
import useSNSShare from './SNSSharing';
import CopyToClipBoard from './CopyToClipBoard';

const styles = {
  iconBox: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),

  image: css({
    width: '30px',
  }),
};

export default function Sharing({ shareTitle, shareUrl }: SNSSharingParams) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);

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
    <Box css={styles.iconBox}>
      <Button onClick={handleOpenPopover}>
        <IosShareIcon />
      </Button>

      <Popover
        open={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box css={styles.iconBox}>
          <Box>
            <CopyToClipBoard copyText="asdfsadf" />
          </Box>

          <Box css={styles.iconBox}>
            <Button onClick={shareToKakaoTalk}>
              <img
                src={`${process.env.PUBLIC_URL}/images/sharingLogo/kakao_logo.png`}
                alt="kakao"
                css={styles.image}
              />
            </Button>
            <Button onClick={shareToFacebook}>
              <img
                src={`${process.env.PUBLIC_URL}/images/sharingLogo/facebook_logo.png`}
                alt="kakao"
                css={styles.image}
              />
            </Button>
            <Button onClick={shareToNaver}>
              <img
                src={`${process.env.PUBLIC_URL}/images/sharingLogo/naver_logo.png`}
                alt="kakao"
                css={styles.image}
              />
            </Button>
            <Button onClick={shareToTwitter}>
              <img
                src={`${process.env.PUBLIC_URL}/images/sharingLogo/twitter_logo.png`}
                alt="kakao"
                css={styles.image}
              />
            </Button>
            {isAvailNavigator && (
              <Button onClick={shareToNavigator}>
                <ShareIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
