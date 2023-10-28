import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { styles } from "./Style";
import { Text, View, Image, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import * as Location from "expo-location";

import { FadeInLeft, FadeInRight } from "./components/AnimatedCurrent";

const API_KEY = "484e6de2b25f6cb8d6a293273b4d27d3";

export default function App() {
  const [city, setCity] = useState("Finding...");
  const [street, setStreet] = useState("");
  const [current, setCurrent] = useState({});
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.streetName}>{street}</Text>
      </View>
      <View style={styles.currentDate}>
        <Text style={styles.dateText}>{getWholeDate()}</Text>
        <Text style={{ fontSize: 14, color: "white" }}>{getUpdatedTime()} updated</Text>
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
