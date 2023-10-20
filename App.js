import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { styles } from "./Style";
import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

const API_KEY = "484e6de2b25f6cb8d6a293273b4d27d3";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [street, setStreet] = useState("");
  const [current, setCurrent] = useState({});
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

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
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.streetName}>{street}</Text>
      </View>
      <View style={styles.current}>
        {!current.main ? (
          <View style={styles.days}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          <View style={styles.currentDay}>
            <Text style={styles.time}>현재 기온 :</Text>
            <Text style={styles.temp}>
              {parseFloat(current.main.temp).toFixed(1)}
              <Text style={styles.description}>°C</Text>
            </Text>
            <Text style={styles.tempSmall}>습도 {current.main.humidity}%</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.description}>{current.weather[0].main}</Text>
              <Image source={{ uri: `https://openweathermap.org/img/wn/${current.weather[0].icon}.png` }} style={styles.weatherIcon} />
            </View>
            <Text style={styles.tinyText}>{current.weather[0].description}</Text>
          </View>
        )}
      </View>
      <ScrollView horizontal style={styles.forecast}>
        {days.length === 0 ? (
          <View style={styles.day}>
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
                <Image source={{ uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png` }} style={styles.weatherIcon} />
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
    </View>
  );
}
