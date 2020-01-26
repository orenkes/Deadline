const createDateSum = ISOdate => {
  let DateTimeString = "";
  console.log(ISOdate, "ISOdate");
  if (ISOdate.includes("Z")) {
    const splitedISOArrays = ISOdate.split(".");
    DateTimeString = splitedISOArrays[0];
  } else {
    DateTimeString = ISOdate;
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const dateTimeArray = DateTimeString.split("T");

  const dateString = dateTimeArray[0];
  const dateArray = dateString.split("-");
  const dateSum = dateArray.reduce(reducer);

  const timeString = dateTimeArray[1];
  const timeArray = timeString.split(":");
  const timeSum = timeArray[0] + timeArray[1];

  // date and time return as strings
  const dateTimeSumString = dateSum + timeSum;
  return Number(dateTimeSumString);
};

export default createDateSum;
