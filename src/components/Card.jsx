/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

export default function Card({ count, units }) {
  // https://www.youtube.com/watch?v=OV8MVmtgmoY&t=283s
  const [display, setDisplay] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      if (count % 2 !== 0) {
        cardRef.current.style.transform = "rotateX(0deg)";
        const delay = setTimeout(() => {
          setDisplay(formatDigit(count));
        }, 300);
        return () => clearTimeout(delay);
      } else {
        cardRef.current.style.transform = "rotateX(180deg)";
        const delay = setTimeout(() => {
          setDisplay(formatDigit(count));
        }, 300);
        return () => clearTimeout(delay);
      }
    }
  }, [count]);

  const formatDigit = (digit) => {
    if (digit >= 10) {
      return digit.toString();
    } else {
      return "0" + digit.toString();
    }
  };

  return (
    <figure className="card-container">
      <div className="flipcard__background">
        <div className="flipcard" ref={cardRef}>
          <div className="flipcard__front">{display}</div>
          <div className="flipcard__back">{display}</div>
          <div className="divider"></div>
          <div className="cut-left"></div>
          <div className="cut-right"></div>
        </div>
      </div>
      <p className="card-footer">{units}</p>
    </figure>
  );
}
