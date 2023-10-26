/** @jsxImportSource @emotion/react */

import { Avatar, Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

interface UserInfoProps {
  userNo: number | null;
  userImage: string | null;
  userNickname: string | null;
}

interface MenuProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const USER_NO = 'userNo';
const USER_IMAGE = 'userImage';
const USER_NICKNAME = 'userNickname';

const IMAGE_API_BASE = 'http://localhost:8080/api/images/users/';
const ANONYMOUS_USER_NICKNAME = '익명 사용자';

const styels = {
  drawerBox: css({
    width: 250,
  }),

  nicknameInput: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // height: '80px',
  }),

  avatarArea: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '150px',
  }),

  avatarImage: css({
    width: 100,
    height: 100,
  }),
};

function Menu({ toggleDrawer }: MenuProps) {
  const initUserInfo: UserInfoProps = {
    userNo: null,
    userNickname: null,
    userImage: null,
  };

  const [userInfo, setUserInfo] = useState<UserInfoProps>(initUserInfo);

  useEffect(() => {
    const storageUserNo = localStorage.getItem(USER_NO);
    const storageUserImage = localStorage.getItem(USER_IMAGE);
    const storageUserNickname = localStorage.getItem(USER_NICKNAME);

    setUserInfo({
      userNo: storageUserNo !== null ? Number(storageUserNo) : null,
      userImage: storageUserImage !== null ? storageUserImage : null,
      userNickname: storageUserNickname !== null ? storageUserNickname : null,
    });
  }, []);

  const userInfoCheck = (checkedUserInfo: UserInfoProps) =>
    checkedUserInfo.userNo !== null && checkedUserInfo.userImage !== null;

  return (
    <Box
      css={styels.drawerBox}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box css={styels.avatarArea}>
        <Avatar
          src={
            userInfoCheck(userInfo) ? `${IMAGE_API_BASE}${userInfo.userNo}` : ''
          }
          css={styels.avatarImage}
        />
      </Box>
      <Box css={styels.nicknameInput}>
        <Typography>
          {userInfo.userNickname !== null
            ? userInfo.userNickname
            : ANONYMOUS_USER_NICKNAME}
        </Typography>
      </Box>

      <Divider />
    </Box>
  );
}

export default Menu;
