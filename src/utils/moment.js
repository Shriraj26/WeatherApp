import moment from "moment";

export default function getDayName(epochTime) {
  return moment(epochTime).format("dddd");
}
