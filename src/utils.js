import moment from "moment";

export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const aboutExpireFormat = (date) => {
  const date1 = new Date(date);
  const date2 = new Date();
  const msDay = 60 * 60 * 24 * 1000;
  const diff = Math.floor((date2 - date1) / msDay);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (diff === 0) {
    return "Today";
  }
  if (diff === 1) {
    return "Tomorrow";
  }
  return `${days[date1.getUTCDay()]} ${moment(date).format("MMM DD, YYYY")}`;
};

export const expired = (date) => {
  const date1 = new Date(date);
  const date2 = new Date();
  const msDay = 60 * 60 * 24 * 1000;
  const diff = Math.floor((date2 - date1) / msDay);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (diff <= 7) {
    if (diff === 1) {
      return "Yesterday";
    }
    return `${days[date1.getUTCDay()]} ${moment(date).format("MMM DD, YYYY")}`;
  }
  return `${moment(date).format("MMM DD, YYYY")}`;
};

export const addZeroes = (num, curren) => {
  // console.log(num)
  // console.log(curren)
  // const array = ['$','£','₵']; let currency = '';
  const dec = num.split(".")[1];
  const len = dec && dec.length > 2 ? dec.length : 2;
  let number = Number(num).toFixed(len);
  if (curren === "GHS") return number + " (₵) ";
  if (curren === "USD") return number + " ($)";
  if (curren === "pounds") return number + " (£)";
};

export const defaultDate = (date) => {
  return moment(date).format("MMM DD, YYYY");
};
export const hex = [
  "#0000ff ",
  "#ff0000",
  "#7CFC00",
  "#ff7f50",
  "#87cefa",
  "#da70d6",
  "#32cd32",
  "#6495ed",
];

export const getRandomNumber = () => {
  return Math.floor(Math.random() * hex.length);
};

export const randomColors = () => {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }
  return hexColor;
};
