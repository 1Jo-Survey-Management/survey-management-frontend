import { SNSSharingParams } from './SNSSharingType';

/**
 * Kakao 선언을 위해 정의하였습니다.
 *
 * @author 강명관
 */
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const windowOpenTargetOptions = {
  blank: '_blank',
  parent: '_parent',
  self: '_self',
  top: '_top',
};

/**
 * 새로운 윈도우 창을 뛰어주는 메서드 입니다.
 *
 * @param snsUrl 새로운 윈도우 창 URL
 * @author 강명관
 */
const openWindow = (snsUrl: string) => {
  window.open(snsUrl, windowOpenTargetOptions.blank || '_blank');
};

/**
 * 트위터 공유하기 입니다.
 *
 * @param {@see SNSSharingParams} 공유하기 제목과 URL 입니다.
 * @author 강명관
 */
const shareToTwitter = ({ shareTitle, shareUrl }: SNSSharingParams) => {
  const sharedLink = `text=${encodeURIComponent(
    `${shareTitle} \n `
  )}${encodeURIComponent(shareUrl)}`;

  openWindow(`https://twitter.com/intent/tweet?${sharedLink}`);
};

/**
 * 페이스북 공유하기 입니다.
 *
 * @param {@see SNSSharingParams} 공유하기 제목과 URL 입니다.
 * @author 강명관
 */
const shareToFacebook = ({ shareUrl }: SNSSharingParams) => {
  const sharedLink = encodeURIComponent(shareUrl);
  openWindow(`http://www.facebook.com/sharer/sharer.php?u=${sharedLink}`);
};

/**
 * 카카오톡 공유하기 입니다.
 *
 * @param {@see SNSSharingParams} 공유하기 제목과 URL 입니다.
 * @author 강명관
 */
const shareToKakaoTalk = ({ shareTitle, shareUrl }: SNSSharingParams) => {
  if (window.Kakao === undefined) {
    return;
  }

  const kakao = window.Kakao;

  if (!kakao.isInitialized()) {
    kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
  }

  kakao?.Share.sendDefault({
    objectType: 'text',
    text: shareTitle,
    link: {
      mobileWebUrl: shareUrl,
      webUrl: shareUrl,
    },
  });
};

/**
 * 네이버 공유하기 입니다.
 *
 * @param {@see SNSSharingParams} 공유하기 제목과 URL 입니다.
 * @author 강명관
 */
const shareToNaver = ({ shareTitle, shareUrl }: SNSSharingParams) => {
  const url = encodeURI(encodeURIComponent(shareUrl));
  const title = encodeURI(shareTitle);
  const shareURL = `https://share.naver.com/web/shareView?url=${url}&title=${title}`;
  openWindow(shareURL);
};

const shareToNavigator = ({ shareTitle, shareUrl }: SNSSharingParams) => {
  const sharedData: ShareData = {
    title: shareTitle,
    url: shareUrl,
  };

  try {
    if (navigator.canShare && navigator.canShare(sharedData)) {
      navigator
        .share(sharedData)
        .then(() => console.log('공유 성공'))
        .catch(() => console.log('공유 취소'));
    }
  } catch (e) {
    console.log('공유 실패');
  }
};

const isAvailNavigator = typeof navigator.share !== 'undefined';

const useSNSShare = ({ shareTitle, shareUrl }: SNSSharingParams) => ({
  isAvailNavigator,
  shareToTwitter: () => shareToTwitter({ shareTitle, shareUrl }),
  shareToFacebook: () => shareToFacebook({ shareTitle, shareUrl }),
  shareToKakaoTalk: () => shareToKakaoTalk({ shareTitle, shareUrl }),
  shareToNaver: () => shareToNaver({ shareTitle, shareUrl }),
  shareToNavigator: () => shareToNavigator({ shareTitle, shareUrl }),
});

export default useSNSShare;