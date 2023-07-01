import React, { useState, useEffect } from "react";
import { useWeatherData } from "hooks/useWeatherData";
import styles from "./Weather.module.scss";
import Image from "next/image";
import getDayName from "@/utils/moment";
export default function Weather() {
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async () => {
    await fetchData({
      q: `${city}`,
      days: 7,
    });
  };
  const [city, setCity] = useState("");
  const [imageURL, setImageURL] = useState("");

  const { data, loading, error, errorMessage, success, fetchData } =
    useWeatherData();

  //   useEffect(() => {
  //     window.addEventListener("keypress", handleKeyPress);
  //     return () => {
  //       window.removeEventListener("keypress", handleKeyPress);
  //     };
  //   }, []);

  useEffect(() => {
    console.log("city is ", city, city.length);
  }, [city]);

  useEffect(() => {
    if (data?.current) {
      setImageURL("https:" + data.current.condition.icon);
    }
    return () => {};
  }, [data]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.searchDiv}>
          <input
            placeholder="Enter City Here..."
            value={city}
            onChange={handleChange}
            className={styles.inputSearch}
          />
          {city.length ? (
            <button onClick={handleSubmit} className={styles.btn}>
              <Image src="/search2.png" alt="My Image" width="50" height="50" />
            </button>
          ) : null}
        </div>

        <div className={styles.mainWeatherInfo}>
          <p>{data?.current?.feelslike_c}° C</p>

          {!loading && success && (
            <Image src={imageURL} alt="My Image" width="120" height="120" />
          )}
        </div>

        <div className={styles.forecastDiv}>
          <table className={styles.table}>
            {!loading &&
              success &&
              data.forecast.forecastday.map((dailyInfo, index) => (
                <tr key={dailyInfo.date_epoch}>
                  <td>
                    <p>
                      {index === 0 ? "Tomorrow" : getDayName(dailyInfo.date)}
                    </p>
                  </td>
                  <td>
                    <p>{dailyInfo.day.avgtemp_c}° C</p>
                  </td>
                  <td>
                    <Image
                      src={"https:" + dailyInfo.day.condition.icon}
                      alt="My Image"
                      width="80"
                      height="80"
                    />
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}
