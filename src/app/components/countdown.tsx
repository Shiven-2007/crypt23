"use client";
import { useState, useEffect } from "react";
import { Changa } from "next/font/google";
import PlayButton from "./PlayButton";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400"],
});

const CountDown = () => {
  let useclienttime = false;
  const endTime = new Date("2023-04-29T01:30:00");
  useEffect(() => {
    async function realTime() {
      const currtime = Date.now();
      const response = await fetch("/getTime", {
        method: "GET",
      });
      const data = await response.json();
      const time1 = new Date(Number(data.message));
      const timesince: number = time1.getTime();
      if (timesince - currtime < 2000) {
        useclienttime = true;
      }
      accTime = timesince;
      return timesince;
    }
    realTime();
  }, []);
  let accTime = 0;
  const [time, setTime] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => {
      if (!useclienttime) {
        setTime(endTime.getTime() - accTime);
        accTime += 1000;
      } else {
        setTime(endTime.getTime() - Date.now());
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  if (time <= 0) {
    return <PlayButton />;
  }

  return time > 1 ? (
    <div className={`t2 ${changa.className}`}>
      <div className="t1">
        <div className="time">{Math.floor(time / 86400000)}</div> <p>DAYS</p>
      </div>
      <div className="t1">
        <div className="time">{Math.floor(time / 3600000) % 24}</div>
        <p>HOURS</p>
      </div>
      <div className="t1">
        <div className="time">{Math.floor(time / 60000) % 60}</div>
        <p>MINUTES</p>
      </div>
      <div className="t1">
        <div className="time">{Math.floor(time / 1000) % 60}</div>
        <p>SECONDS</p>
      </div>
    </div>
  ) : (
    <div className={`t2 ${changa.className}`}>
      <div className="t1">
        <div className="time">-</div> <p>DAYS</p>
      </div>
      <div className="t1">
        <div className="time">-</div>
        <p>HOURS</p>
      </div>
      <div className="t1">
        <div className="time">-</div>
        <p>MINUTES</p>
      </div>
      <div className="t1">
        <div className="time">-</div>
        <p>SECONDS</p>
      </div>
    </div>
  );
};

export default CountDown;
