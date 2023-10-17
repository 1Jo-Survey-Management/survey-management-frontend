import React, { useEffect, useState } from 'react';
import moment from 'moment';

/**
 * accessToken 의 유효시간의 남은 시간 확인
 * @param param0
 * @returns 토큰 유효시간
 */
function CountdownTimer({ targetDate }: { targetDate: moment.Moment }) {
  const calculateTimeLeft = () => {
    const now = moment();
    const difference = targetDate.diff(now, 'seconds');

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (60 * 60 * 24));
    const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((difference % (60 * 60)) / 60);
    const seconds = difference % 60;

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div>
      <p>Days: {timeLeft.days}</p>
      <p>Hours: {timeLeft.hours}</p>
      <p>Minutes: {timeLeft.minutes}</p>
      <p>Seconds: {timeLeft.seconds}</p>
    </div>
  );
}

export default CountdownTimer;
