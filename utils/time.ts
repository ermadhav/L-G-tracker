export function getLocalEndOfDayOffsets() {
  return [
    { hoursBefore: 5 },
    { hoursBefore: 1 },
  ];
}

// IST = UTC + 5:30
export function getISTTimes() {
  return [
    { hour: 5, minute: 30 },
    { hour: 23, minute: 30 },
  ];
}
