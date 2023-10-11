import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './MenuTool.css';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

function MenuTool() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuCloseGoWriteSurvey = () => {
    setAnchorEl(null);
    navigate('/survey/MypageWrite');
  };

  const handleMenuCloseGoPartySurvey = () => {
    setAnchorEl(null);
    navigate('/survey/MypageAttend');
  };

  const handleMenuCloseGoMypageModify = () => {
    setAnchorEl(null);
    navigate('/survey/Mypage');
  };

  return (
    <div>
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <div className="avatar-area">
          <Avatar
            src="/broken-image.jpg"
            sx={{
              width: 100,
              height: 100,
            }}
          />
        </div>
        <div className="nickname-input">
          <TextField
            id="standard-read-only-input"
            label="NickName"
            defaultValue="user1"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </div>
        <div className="menu-item-area">
          <MenuItem
            onClick={handleMenuCloseGoWriteSurvey}
            sx={{
              fontWeight: 900,
              fontSize: 18,
            }}
          >
            내가 작성한 설문 목록
          </MenuItem>
          <MenuItem
            onClick={handleMenuCloseGoPartySurvey}
            sx={{
              fontWeight: 900,
              fontSize: 18,
            }}
          >
            내가 참여한 설문 목록
          </MenuItem>
          <MenuItem
            onClick={handleMenuCloseGoMypageModify}
            sx={{
              fontWeight: 900,
              fontSize: 18,
            }}
          >
            회원 정보 수정
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}

export default MenuTool;
