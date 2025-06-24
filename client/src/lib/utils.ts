import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }
  
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  return time;
}

export function formatDateTime(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }
  
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function getNextPrayer(prayerTimes: any): { name: string, time: string, timeLeft: string } {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const prayers = [
    { name: "Fajr", time: prayerTimes.fajr },
    { name: "Dhuhr", time: prayerTimes.dhuhr },
    { name: "Asr", time: prayerTimes.asr },
    { name: "Maghrib", time: prayerTimes.maghrib },
    { name: "Isha", time: prayerTimes.isha },
  ];
  
  // Convert prayer times to hours and minutes
  const prayerHoursMins = prayers.map(prayer => {
    const [hourStr, minuteStr] = prayer.time.split(':');
    let hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    
    // Convert to 24-hour format if PM
    if (prayer.time.includes('PM') && hour !== 12) {
      hour += 12;
    } else if (prayer.time.includes('AM') && hour === 12) {
      hour = 0;
    }
    
    return { 
      name: prayer.name, 
      time: prayer.time,
      hour,
      minute,
      totalMinutes: hour * 60 + minute
    };
  });
  
  // Current time in minutes
  const currentTotalMinutes = currentHour * 60 + currentMinute;
  
  // Find the next prayer
  let nextPrayer = prayerHoursMins.find(prayer => prayer.totalMinutes > currentTotalMinutes);
  
  // If no prayer is found, it means the next prayer is Fajr of the next day
  if (!nextPrayer) {
    nextPrayer = prayerHoursMins[0]; // Fajr
  }
  
  // Calculate time difference in minutes
  let minutesDiff = nextPrayer.totalMinutes - currentTotalMinutes;
  
  // If negative, it means next prayer is tomorrow
  if (minutesDiff < 0) {
    minutesDiff += 24 * 60; // Add a day
  }
  
  // Format the time left
  const hoursLeft = Math.floor(minutesDiff / 60);
  const minutesLeft = minutesDiff % 60;
  
  let timeLeft = "";
  if (hoursLeft > 0) {
    timeLeft += `${hoursLeft} hour${hoursLeft > 1 ? 's' : ''} `;
  }
  timeLeft += `${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}`;
  
  return {
    name: nextPrayer.name,
    time: nextPrayer.time,
    timeLeft
  };
}

export function getHijriDate(): string {
  // In a real implementation, we would use a Hijri date converter library
  // This is a placeholder for now
  const hijriMonths = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];
  
  // A very simple approximation (not accurate)
  const today = new Date();
  const hijriYear = Math.floor(today.getFullYear() - 622 + (today.getMonth() > 8 ? 1 : 0));
  const hijriMonth = (today.getMonth() + 3) % 12;
  const hijriDay = today.getDate();
  
  return `${hijriDay} ${hijriMonths[hijriMonth]} ${hijriYear} AH`;
}
