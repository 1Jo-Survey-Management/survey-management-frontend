/* eslint-disable @typescript-eslint/no-unused-vars */
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
    justifyContent: 'flex-start',
  }),

  popoverBox: css({
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 12px 20px 12px',
  }),

  copyClipBoardBox: css({
    marginBottom: '12px',
  }),

  imageButton: css({
    padding: '0px',
    outline: 'none',
    border: 'none',
    backgroundColor: '#ffffff',
    marginRight: '8px',
  }),

  image: css({
    width: '40px',
    borderRadius: '30px',
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
    shareTitle,
    shareUrl,
  });

  return (
    <Box>
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
        <Box css={styles.popoverBox}>
          <Box css={styles.copyClipBoardBox}>
            <CopyToClipBoard copyText="asdfsadf" />
          </Box>

          <Box css={styles.iconBox}>
            <button
              type="button"
              css={styles.imageButton}
              onClick={shareToFacebook}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/sharingLogo/facebook.png`}
                alt="kakao"
                css={styles.image}
              />
            </button>
            <button
              type="button"
              css={styles.imageButton}
              onClick={shareToKakaoTalk}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/sharingLogo/kakaotalk.png`}
                alt="kakao"
                css={styles.image}
              />
            </button>
            <button
              type="button"
              css={styles.imageButton}
              onClick={shareToNaver}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/sharingLogo/naver.png`}
                alt="kakao"
                css={styles.image}
              />
            </button>
            <button
              type="button"
              css={styles.imageButton}
              onClick={shareToTwitter}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/sharingLogo/twitter.png`}
                alt="kakao"
                css={styles.image}
              />
            </button>
            {isAvailNavigator && (
              <button
                aria-label="Share"
                type="button"
                onClick={shareToNavigator}
              >
                <ShareIcon />
              </button>
            )}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
