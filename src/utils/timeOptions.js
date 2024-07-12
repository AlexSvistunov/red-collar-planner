function fillTime(arrayOptions) {
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      let hourFormatted = hour.toString().padStart(2, "0");
      let minuteFormatted = minute.toString().padStart(2, "0");
      arrayOptions.push({
        value: `${hourFormatted}:${minuteFormatted}`,
        label: `${hourFormatted}:${minuteFormatted}`,
      });
    }
  }

  return arrayOptions;
}

export default fillTime;
