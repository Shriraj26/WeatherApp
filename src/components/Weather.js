import React, { useState, useEffect, useRef } from "react";
import { useWeatherData } from "hooks/useWeatherData";
import styles from "./Weather.module.scss";
import Image from "next/image";
import getDayName from "@/utils/moment";
import ClipLoader from "react-spinners/ClipLoader";
import { getImageByHour } from "@/utils/moment";

export default function Weather() {
  const [backgroundImage, setBackgroundImage] = useState(getImageByHour());
  const handleSubmit = async () => {
    await fetchData({
      q: `${ref.current.value}`,
      days: 7,
    });
  };

  const ref = useRef(null);
  const { data, loading, error, errorMessage, success, fetchData } =
    useWeatherData();

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && ref.current.value.length > 0) {
      await handleSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    if (ref) {
      ref.current.value = "San Diego";
      handleSubmit();
    }
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.container}>
        <div className={styles.searchDiv}>
          <input
            ref={ref}
            placeholder="Enter City Here..."
            className={styles.inputSearch}
          />

          <button onClick={handleSubmit} className={styles.btn}>
            <Image src="/search.png" alt="My Image" width="35" height="35" />
          </button>
        </div>

        {loading && (
          <ClipLoader
            color={"#FCFCFD"}
            loading={loading}
            cssOverride={{ marginTop: "5em" }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        {!loading && !success && (
          <h1 style={{ marginTop: "2em", color: "white" }}>
            Invalid City, Please Retry
          </h1>
        )}
        {!loading && success && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className={styles.mainWeatherInfo}>
              <p style={{ color: "wheat" }}>{data?.current?.feelslike_c}°C</p>

              {!loading && success && (
                <Image
                  src={"https:" + data.current.condition.icon}
                  alt="My Image"
                  width="100"
                  height="100"
                />
              )}
            </div>

            <p
              style={{
                color: "white",
                fontSize: "16px",
              }}
            >
              {data.location.name}, {data.location.region},{" "}
              {data.location.country}
            </p>
          </div>
        )}

        {!loading && success && (
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
                        width="60"
                        height="60"
                      />
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
