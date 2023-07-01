import moment from "moment";

export default function getDayName(epochTime) {
  return moment(epochTime).format("dddd");
}

export function getImageByHour() {
  let currentHour = moment().format("HH");
  if (currentHour >= 3 && currentHour < 12) {
    return "/day.jpg";
  } else if (currentHour >= 12 && currentHour < 15) {
    return "/afternoon.jpg";
  } else if (currentHour >= 15 && currentHour < 20) {
    return "/evening.jpg";
  } else if (currentHour >= 20 || currentHour < 3) {
    return "/night.jpg";
  }
}
