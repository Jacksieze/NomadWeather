import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    paddingHorizontal: 10,
  },
  city: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "700",
    color: "white",
  },
  streetName: {
    fontSize: 24,
    fontWeight: "500",
    color: "white",
  },
  current: {
    flex: 1.3,
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
  },
  forecast: {
    flex: 1,
    marginTop: 20,
  },
  currentDay: {
    alignItems: "center",
  },
  days: {
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    borderLeftWidth: 1,
    borderLeftColor: "white",
  },
  time: {
    marginTop: 10,
    fontSize: 24,
    color: "white",
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 60,
    fontWeight: "600",
    color: "white",
  },
  tempSmall: {
    fontSize: 16,
    color: "white",
  },
  description: {
    marginTop: -10,
    fontSize: 36,
    color: "white",
  },
  descriptionSmall: {
    fontSize: 12,
    color: "white",
  },
  tinyText: {
    fontSize: 24,
    color: "white",
  },
});