import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { styles } from "./Style";
import { Text, View, Image, ScrollView, ActivityIndicator, RefreshControl, ImageBackground } from "react-native";
import * as Location from "expo-location";

import { FadeInLeft, FadeInRight } from "./components/AnimatedCurrent";

const API_KEY = "484e6de2b25f6cb8d6a293273b4d27d3";
const IMAGE_API_KEY = "YShkHGvfaReZISVX61swALybD7xjT8bU6KJMzeeGhpRnJpW13Gtk36tZ";

export default function App() {
  const [city, setCity] = useState("Finding...");
  const [street, setStreet] = useState("");
  const [current, setCurrent] = useState({});
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#f7b733");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [timeOfDayImage, setTimeOfDayImage] = useState(null);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getWeather = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setOk(false);
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
      setCity(location[0].city);
      setStreet(location[0].street);

      const responseCurrent = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
      );
      const responseForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
      );
      const Current = await responseCurrent.json();
      const Forecast = await responseForecast.json();
      setCurrent(Current);
      setDays(Forecast.list);

      const weatherCondition = Current.weather[0].main;
      const newBackgroundColor = getBackgroundColorByWeatherCondition(weatherCondition);
      setBackgroundColor(newBackgroundColor);
      getPexelsImage(weatherCondition);
    } catch (e) {
      console.log(e);
      setOk(false);
    }
  };

  const getWholeDate = () => {
    let dateObj = new Date();
    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();
    let day = dateObj.getDay();
    let dayArr = ["일", "월", "화", "수", "목", "금", "토"];
    return `${month}월 ${date}일 ${dayArr[day]}요일`;
  };

  const getUpdatedTime = () => {
    let dateObj = new Date();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    return `${hours}시 ${minutes}분`;
  };

  const getDate = (dt_txt) => {
    let dateObj = new Date(dt_txt + "Z");
    return dateObj.getDate();
  };

  const getHour = (dt_txt) => {
    let dateObj = new Date(dt_txt + "Z");
    return dateObj.getHours();
  };

  const getBackgroundColorByWeatherCondition = (condition) => {
    const colors = {
      Clear: "#FFBF00",
      Rain: "#005BEA",
      Thunderstorm: "#616161",
      Clouds: "#1F1C2C",
      Snow: "#00d2ff",
      Mist: "#3CD3AD",
    };
    return colors[condition] || "#FFBF00";
  };

  const getTimeOfDayKeyword = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "morning";
    } else if (currentHour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  const getPexelsImage = async (condition) => {
    const url = `https://api.pexels.com/v1/search?query=${condition}+weather&per_page=1`;
    const headers = {
      Authorization: IMAGE_API_KEY,
    };
    try {
      const response = await fetch(url, { headers });
      const json = await response.json();
      if (json.photos.length > 0) {
        setBackgroundImage(json.photos[0].src.original);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTimeOfDayImage = async () => {
    const timeOfDay = getTimeOfDayKeyword();
    const url = `https://api.pexels.com/v1/search?query=${timeOfDay}+weather&per_page=1`;
    const headers = {
      Authorization: IMAGE_API_KEY,
    };
    try {
      const response = await fetch(url, { headers });
      const json = await response.json();
      if (json.photos.length > 0) {
        setTimeOfDayImage(json.photos[0].src.original);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
    getTimeOfDayImage();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: backgroundColor }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.container}>
      <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
          <Text style={styles.streetName}>{street}</Text>
        </View>
        <View style={styles.currentDate}>
          <Text style={styles.dateText}>{getWholeDate()}</Text>
          <Text style={{ fontSize: 14, color: "white", textShadowRadius: 14 }}>{getUpdatedTime()} updated</Text>
        </View>
        <View style={styles.current}>
          {!current.main ? (
            <View style={styles.days}>
              <ActivityIndicator color="white" size="large" />
            </View>
          ) : (
            <>
              <View style={styles.currentDay}>
                <FadeInLeft current={current} />
                <FadeInRight current={current} />
              </View>
            </>
          )}
        </View>
      </ImageBackground>
      <ScrollView horizontal style={styles.forecast}>
        {days.length === 0 ? (
          <View style={styles.forecast}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          days.map((day, index) => {
            let date = getDate(day.dt_txt);
            let hours = getHour(day.dt_txt);

            return (
              <View key={index} style={styles.days}>
                <Text style={styles.tempSmall}>{date}일</Text>
                <Text style={styles.tempSmall}>{hours}시</Text>
                <Image
                  source={{ uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png` }}
                  style={styles.weatherIcon}
                />
                <Text style={styles.tempSmall}>
                  {parseFloat(day.main.temp).toFixed(0)}
                  <Text style={styles.descriptionSmall}>°C</Text>
                </Text>
                <Text style={styles.tempSmall}>{day.main.humidity}%</Text>
              </View>
            );
          })
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
