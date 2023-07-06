import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ date }) => {
  const calculateTimeLeft = () => {
    const difference = date - Math.floor(Date.now() / 1000);

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (24 * 60 * 60));
    const hours = Math.floor((difference / (60 * 60)) % 24);
    const minutes = Math.floor((difference / 60) % 60);
    const seconds = Math.floor(difference % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="countdown-timer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="countdown-item" style={{ textAlign: 'center', marginRight: '1rem' }}>
        <div className="countdown-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{days}</div>
        <div className="countdown-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>DAYS</div>
      </div>
      <div className="countdown-item" style={{ textAlign: 'center', marginRight: '1rem' }}>
        <div className="countdown-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{hours}</div>
        <div className="countdown-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>HOURS</div>
      </div>
      <div className="countdown-item" style={{ textAlign: 'center', marginRight: '1rem' }}>
        <div className="countdown-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{minutes}</div>
        <div className="countdown-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>MINUTES</div>
      </div>
      <div className="countdown-item" style={{ textAlign: 'center' }}>
        <div className="countdown-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{seconds}</div>
        <div className="countdown-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>SECONDS</div>
      </div>
    </div>
  );
};

export default CountdownTimer;