export function getCurrentWeek() {
  const today = new Date();

  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

  const pastDaysOfYear =
    (today - firstDayOfYear) / 86400000;

  const week = Math.ceil(
    (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
  );
    
    const days = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag"
  ];

  const dayName = days[today.getDay()];
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  return `v${week} - ${dayName} ${hours}:${minutes}`;
}