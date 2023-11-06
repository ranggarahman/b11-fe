import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import loader from "../../assets/loading-chicken-2.json";
import { useLocation } from "../../hooks/useLocation";
import { useImageCarousel } from "../../hooks/useImageCarousel";
import { useWeatherData } from "../../hooks/useWeatherData";
import Loader from "../../utils/Loader";
import HomeCarousel from "../../components/dashboard/HomeCarousel";

const HomePage = () => {
  let content;

  const userToken = localStorage.getItem("userToken").toString();

  const [withFrame, setWithFrame] = useState(false);

  const imageCarouselData = useImageCarousel(userToken, withFrame);
  const userLocation = useLocation();
  const weatherData = useWeatherData(userLocation);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  if (weatherData === null) {
    console.log(`USER TOKEN : ${userToken}`);

    content = (
      <div className="flex h-screen items-center justify-center">
        <Loader loaderOptions={loaderOptions} />
      </div>
    );
  } else {
    content = (
      <div className="p-4">
        <h1 className="text-4xl font-bold">Hello Yazid!</h1>
        <div className="flex flex-col lg:flex-row mt-4">
          <div className="w-full lg:w-1/2 lg:pr-4 mb-4 lg:mb-0">
            <div className="bg-gray-200 p-4 h-full rounded-lg shadow">
              <h2 className="text-2xl font-bold">Hasil Prediksi</h2>
              <p className="text-sm italic">
                {today}, {weatherData.location.name},{" "}
                {weatherData.location.region}
              </p>
              <div className="flex items-center justify-center mt-2">
                <img
                  src={weatherData.current.condition.icon}
                  alt="Icon"
                  className="w-10 h-10"
                />
                <div className="ml-2 mt-4 text-xl">
                  <p>Weather: {weatherData.current.condition.text}</p>
                  <p>Temperature: {weatherData.current.temp_c}°C</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center justify-center">
                <div style={{ width: 300, height: 300 }}>
                  <CircularProgressbar
                    value={95}
                    text={`${95}%`}
                    styles={buildStyles({
                      textSize: "36px",
                      textColor: "black",
                    })}
                  />
                </div>
                <p className="mt-2">Persentase Jumlah Ayam</p>
              </div>
              <ul className="mt-4">
                <li>Chickens that are alive: {275}</li>
                <li>Number of chickens that are dead: {25}</li>
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-200 p-4 h-full rounded-md shadow">
              <h2 className="text-2xl font-bold">Foto Kandang</h2>

              {imageCarouselData.length === 0 ? (<p>Belum Ada Data Foto</p>) : (
                <div>
                  <HomeCarousel
                    imageCarouselData={imageCarouselData}
                    withFrame={withFrame}
                    setWithFrame={setWithFrame}
                  />
              </div>
              )}

            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default HomePage;
