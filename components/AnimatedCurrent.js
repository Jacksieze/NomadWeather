import React, { useRef, useEffect } from "react";
import { Text, View, Image, Animated } from "react-native";
import { styles } from "../Style";

const FadeInLeft = ({ current }) => {
  const fadeAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateX: fadeAnim }] }}>
      <Text style={styles.time}>현재 기온 :</Text>
      <Text style={styles.temp}>
        {parseFloat(current.main.temp).toFixed(1)}
        <Text style={styles.description}>°C</Text>
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.description}>{current.weather[0].main}</Text>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${current.weather[0].icon}.png` }}
          style={styles.weatherIcon}
        />
      </View>
      <Text style={styles.tinyText}>{current.weather[0].description}</Text>
    </Animated.View>
  );
};

const FadeInRight = ({ current }) => {
  const fadeAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateX: fadeAnim }], justifyContent: "center" }}>
      <Text style={styles.sideViewText}>
        체감 기온 : {parseFloat(current.main.feels_like).toFixed(1)}
        <Text style={styles.sideViewText}>°C</Text>
      </Text>
      <Text style={styles.sideViewText}>습도 : {current.main.humidity}%</Text>
      <Text style={styles.sideViewText}>풍속 : {current.wind.speed}m/s</Text>
    </Animated.View>
  );
};

export { FadeInLeft, FadeInRight };
