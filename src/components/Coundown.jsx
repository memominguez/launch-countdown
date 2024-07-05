/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import Card from "./Card";
import iconFacebook from "/icon-facebook.svg";
import iconPinterest from "/icon-pinterest.svg";
import iconInstagram from "/icon-instagram.svg";

export default function Coundown() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  const countdown = useCallback(() => {
    const endDate = selectedDate.getTime();   
    const now = new Date().getTime();  
    const difference = endDate - now   

    if (!selectedDate || difference < 100) return    

    const timeDays = Math.floor(difference / 1000 / 60 / 60 / 24);
    setDays(timeDays);
    const remainSecs1 = difference / 1000 - timeDays * 24 * 60 * 60;
    const timeHours = Math.floor(remainSecs1 / 60 / 60);
    setHours(timeHours);
    const remainSecs2 = remainSecs1 - timeHours * 60 * 60;
    const timeMins = Math.floor(remainSecs2 / 60);
    setMinutes(timeMins);
    const timeSecs = Math.floor(remainSecs2 % 60);
    setSeconds(timeSecs);
  }, [selectedDate]);

  useEffect(() => {
    const counter = setInterval(() => {
      countdown();
    }, 1000);

    return () => clearInterval(counter);
  }, [countdown]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  // Minimum and maximum dates
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)  
  const inNinetyDays = new Date()
  inNinetyDays.setDate(today.getDate() + 90)  
  
 
  return (
    <section className="container">
      <h1 className="title">WE&apos;RE LAUNCHING SOON</h1>
      <figure className="countdown">
        <Card count={days} units="DAYS" />
        <Card count={hours} units="HOURS" />
        <Card count={minutes} units="MINUTES" />
        <Card count={seconds} units="SECONDS" />
      </figure>

      <div className="date-picker">
        <p>Set target date</p>
        <DatePicker 
            selected={selectedDate}
            onChange={handleDateChange}        
            minDate = {tomorrow}
            maxDate = {inNinetyDays}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}           
            dateFormat="Pp"
            timeCaption="time"
            placeholderText="Pick a date & time"
        />
      </div>

      <figure className="socials">
        {/* Facebook */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="social-icon">
          <path
            fill="#8385A9"
            d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"
          />
        </svg>
        {/* Pinterest */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="social-icon">
          <path
            fill="#8385A9"
            d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
          />
        </svg>
        {/* Instagram */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="social-icon">
          <path
            fill="#8385A9"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
          />
        </svg>
      </figure>

      <figure className="sticky-footer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="1440"
          height="197"
        >
          <defs>
            <path id="a" d="M0 0h1440v197H0z" />
          </defs>
          <g fill="none" fillRule="evenodd">
            <mask id="b" fill="#fff">
              <use xlinkHref="#a" />
            </mask>
            <g mask="url(#b)">
              <path
                fill="#211A29"
                d="M1440 50.205L1088.504 0 949.669 50.205 878 25.102 556 0 398.525 50.205l-95.807-25.103-51.328 16.761L45.704 0 0 17.701V160h1440z"
              />
              <path
                fill="#1A1823"
                d="M1394.296 1l94.649 69.336 50.047-49.449zM1137.282 42.576l51.328 27.76 80.6-5.426zM884 1l157.475 83.151 80.929-26.062zM351.496 1l138.835 83.151 49.321-28.526z"
              />
              <path
                fill="#2F2439"
                d="M0 84.151L351.496 1l138.835 83.151L562 42.576 884 1l157.475 83.151 95.807-41.575 51.328 27.76L1394.296 1 1440 30.317V266H0z"
              />
            </g>
          </g>
        </svg>
      </figure>
    </section>
  );
}
