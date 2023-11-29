import React from 'react';
import './Footer.css';
import { Box, Toolbar, Divider, Typography } from '@mui/material';

/**
 * Layout의 Footer 입니다
 * @returns Footer
 */
function Footer() {
  return (
    <div>
      <Divider sx={{ marginTop: '70px' }} />
      <Box
        sx={{
          position: 'static',
          display: 'flex',
          bottom: 0,
          width: '100%',
          height: '180px',
          justifyContent: 'center',
          zIndex: 1000,
          alignItems: 'center',
        }}
        color="D3D4F5"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            opacity: '0.7',
            gap: '100px',
            '@media (max-width: 600px)': {
              paddingRight: '20px',
              flexDirection: 'column',
              gap: '20px',
            },
            paddingRight: '100px',
          }}
        >
          <Typography
            onClick={() =>
              window.open('https://github.com/1Jo-Survey-Management')
            }
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            GitHub
          </Typography>
          <Typography
            onClick={() =>
              window.open(
                'https://www.notion.so/e360be7f062f49e6b3577961632d0635?v=4112a980c5ac420883d3a9b688813b36'
              )
            }
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            Notion
          </Typography>
        </Box>
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              opacity: '0.7',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/surveyLogo/footerlogo.png`}
              alt="로고"
              style={{
                width: '130px',
                height: 'auto',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '15px',
                alignItems: 'center',
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/footer/github.png`}
                alt="github"
                style={{
                  width: '25px',
                  height: '25px',
                }}
              />
              <img
                src={`${process.env.PUBLIC_URL}/images/footer/notion.png`}
                alt="notion"
                style={{
                  width: '28px',
                  height: 'auto',
                }}
              />
              <img
                src={`${process.env.PUBLIC_URL}/images/footer/erd.png`}
                alt="github"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
              <img
                src={`${process.env.PUBLIC_URL}/images/footer/swagger.png`}
                alt="github"
                style={{
                  width: '30px',
                  height: '30px',
                }}
              />
            </Box>
          </Box>
        </Toolbar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            opacity: '0.7',
            gap: '100px',
            '@media (max-width: 600px)': {
              paddingLeft: '20px',
              flexDirection: 'column',
              gap: '20px',
            },
            paddingLeft: '100px',
          }}
        >
          <Typography
            onClick={() =>
              window.open('https://www.erdcloud.com/d/hTYqPxP3ikyJCKt5F')
            }
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            ERD Cloud
          </Typography>
          <Typography
            onClick={() =>
              window.open('http://localhost:8080/swagger-ui/index.html')
            }
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            API Docs
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Footer;
