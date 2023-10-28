import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    paddingHorizontal: 10,
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
  },
  streetName: {
    fontSize: 24,
    fontWeight: "500",
    color: "white",
  },

  currentDate: {
    marginTop: 20,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 24,
    color: "white",
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
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },

  forecast: {
    flex: 1,
    marginVertical: 20,
  },
  days: {
    alignItems: "center",
    justifyContent: "center",
    height: 160,
    borderLeftWidth: 1,
    borderLeftColor: "white",
  },
  time: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
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
    fontSize: 18,
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
