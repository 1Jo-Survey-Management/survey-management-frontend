// /**
//  * ScrollProgress 컴포넌트는 페이지 스크롤 진행 상태를 시각적으로 나타내는 막대를 표시합니다.
//  * 이 막대는 페이지 상단에 고정되며, 사용자가 직접 클릭 또는 키보드를 통해 스크롤 위치를 조정할 수 있습니다.
//  *
//  * @component
//  * @example
//  * return <ScrollProgress />
//  *
//  * @author 박창우
//  */
// import React, {
//   useState,
//   useCallback,
//   useEffect,
//   useRef,
//   memo,
//   MouseEvent,
//   KeyboardEvent,
// } from 'react';

// function ScrollProgress() {
//   const [width, setWidth] = useState<number>(0);
//   const progressRef = useRef<HTMLDivElement | null>(null);

//   /**
//    * 사용자의 마우스 클릭 위치에 따라 스크롤 위치를 조정하는 함수입니다.
//    *
//    * @param {MouseEvent<HTMLDivElement>} e - 발생한 마우스 이벤트입니다.
//    */
//   const handleProgressMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
//     if (progressRef.current) {
//       const { scrollWidth } = progressRef.current;
//       const { clientX } = e;

//       const selectedPercent: number = (clientX / scrollWidth) * 100;
//       setWidth(selectedPercent);

//       const { scrollHeight, clientHeight } = document.body;
//       const windowHeight: number = scrollHeight - clientHeight;
//       const moveScrollPercent: number = (windowHeight * selectedPercent) / 100;

//       window.scrollTo({
//         top: moveScrollPercent,
//         behavior: 'smooth',
//       });
//     }
//   }, []);

//   /**
//    * 사용자의 키보드 입력에 따라 스크롤 위치를 조정하는 함수입니다.
//    *
//    * @param {KeyboardEvent<HTMLDivElement>} e - 발생한 키보드 이벤트입니다.
//    */
//   const handleKeyboardMove = useCallback(
//     (e: KeyboardEvent<HTMLDivElement>) => {
//       if (e.key === 'Enter' || e.key === ' ') {
//         handleProgressMove(e as unknown as MouseEvent<HTMLDivElement>);
//       }
//     },
//     [handleProgressMove]
//   );

//   /**
//    * 페이지의 스크롤 위치에 따라 진행 막대의 너비를 조정하는 함수입니다.
//    */
//   const handleScroll = useCallback(() => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//     if (scrollTop === 0) {
//       setWidth(0);
//       return;
//     }

//     const windowHeight: number = scrollHeight - clientHeight;
//     const currentPercent: number = scrollTop / windowHeight;

//     setWidth(currentPercent * 100);
//   }, []);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll, true);

//     return () => {
//       window.removeEventListener('scroll', handleScroll, true);
//     };
//   }, [handleScroll]);

//   return (
//     <div
//       tabIndex={0}
//       role="button"
//       className="ScrollProgress"
//       ref={progressRef}
//       onClick={handleProgressMove}
//       onKeyPress={handleKeyboardMove}
//       style={{
//         width: '100%',
//         height: '4px',
//         backgroundColor: 'var(--gray)',
//         position: 'fixed',
//         top: 0,
//         left: '5px',
//         right: '5px',
//         zIndex: 1000,
//       }}
//     >
//       <div
//         className="ScrollProgress-Progress"
//         style={{
//           width: `${width}%`,
//           height: '4px',
//           backgroundColor: 'var(--blue)',
//         }}
//       />
//     </div>
//   );
// }

// export default memo(ScrollProgress);
