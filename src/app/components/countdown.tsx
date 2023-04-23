"use client";
import { headers } from "next/dist/client/components/headers";
import { useState, useEffect } from "react";

const CountDown = () => {
  let useclienttime = false;
  const endTime = new Date("2023-04-29T00:00:00");
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
      }
      accTime = timesince;
      return timesince;
    }
    realTime();
  }, []);
  let accTime = 0;
  const [time, setTime] = useState(0);
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
  return time != 0 ? (
    <div className="t2 flex">
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
    <div className="t2 flex">
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
