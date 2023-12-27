import { StyleSheet } from "react-native";

const textShadow = 14;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 3,
    justifyContent: "center",
  },

  city: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
  },
  cityName: {
    fontSize: 36,
    fontWeight: "700",
    color: "white",
    textShadowRadius: textShadow,
  },
  streetName: {
    fontSize: 24,
    fontWeight: "500",
    color: "white",
    textShadowRadius: textShadow,
  },

  currentDate: {
    marginTop: 20,
    marginLeft: 10,
    textShadowRadius: textShadow,
  },
  dateText: {
    fontSize: 24,
    color: "white",
    textShadowRadius: textShadow,
  },

  current: {
    flex: 1.2,
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
  },
  currentDay: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  sideView: {
    justifyContent: "center",
  },
  sideViewText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    textShadowRadius: textShadow,
  },

  forecast: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 20,
  },
  days: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 160,
    borderRightWidth: 0.5,
    borderRightColor: "white",
  },
  time: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    textShadowRadius: textShadow,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 48,
    fontWeight: "600",
    color: "white",
    textShadowRadius: textShadow,
  },
  tempSmall: {
    fontSize: 16,
    color: "white",
    textShadowRadius: textShadow,
  },
  description: {
    marginTop: -10,
    fontSize: 32,
    color: "white",
    textShadowRadius: textShadow,
  },
  descriptionSmall: {
    fontSize: 12,
    color: "white",
    textShadowRadius: textShadow,
  },
  tinyText: {
    fontSize: 22,
    color: "white",
    textShadowRadius: textShadow,
  },
});
