import { apiRequest } from "./queryClient";

export interface PrayerTimesData {
  // Adhan (call to prayer) times
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;

  // Iqamah (start of congregational prayer) times
  fajrIqamah: string;
  dhuhrIqamah: string;
  asrIqamah: string;
  maghribIqamah: string;
  ishaIqamah: string;

  date: string;
  readable: string;
  timestamp: number;
  masjidBoxUrl?: string;
}

export interface MasjidBoxPrayerTimes {
  name: string;
  date: string;
  hijriDate: string;
  prayers: {
    fajr: {
      adhan: string;
      iqamah: string;
    };
    sunrise: {
      adhan: string;
    };
    dhuhr: {
      adhan: string;
      iqamah: string;
    };
    asr: {
      adhan: string;
      iqamah: string;
    };
    maghrib: {
      adhan: string;
      iqamah: string;
    };
    isha: {
      adhan: string;
      iqamah: string;
    };
  };
}

export interface WeeklyPrayerTime {
  date: string;
  day: string;
  readable: string;

  // Adhan times
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;

  // Iqamah times
  fajrIqamah: string;
  dhuhrIqamah: string;
  asrIqamah: string;
  maghribIqamah: string;
  ishaIqamah: string;

  jummuah: string | null;
  masjidBoxUrl?: string;
}

export async function fetchPrayerTimes(date?: Date): Promise<PrayerTimesData> {
  const dateParam = date ? `?date=${date.toISOString().split("T")[0]}` : "";
  const response = await apiRequest("GET", `/api/prayer-times${dateParam}`);
  return await response.json();
}

export async function fetchWeeklyPrayerTimes(): Promise<WeeklyPrayerTime[]> {
  const response = await apiRequest("GET", "/api/prayer-times/week");
  return await response.json();
}

export async function fetchMasjidBoxPrayerTimes(): Promise<MasjidBoxPrayerTimes> {
  const url = "https://masjidbox.com/prayer-times/masjid-al-ezz";

  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch from MasjidBox: ${response.status}`);
    }

    const data = await response.json();

    // Extract the prayer times from the HTML response
    const htmlContent = data.contents;

    // Parse the HTML to extract JSON data
    const jsonDataMatch = htmlContent.match(
      /var\s+masjidData\s*=\s*({[\s\S]*?});/,
    );

    if (!jsonDataMatch || !jsonDataMatch[1]) {
      throw new Error("Could not find prayer times data in the response");
    }

    // Clean and parse the JSON
    const jsonStr = jsonDataMatch[1].replace(/\\'/g, "'");
    const masjidData = JSON.parse(jsonStr);

    return {
      name: masjidData.name,
      date: masjidData.today.date,
      hijriDate: masjidData.today.hijriDate,
      prayers: {
        fajr: {
          adhan: masjidData.today.prayers.fajr.adhan,
          iqamah: masjidData.today.prayers.fajr.iqamah,
        },
        sunrise: {
          adhan: masjidData.today.prayers.sunrise.adhan,
        },
        dhuhr: {
          adhan: masjidData.today.prayers.dhuhr.adhan,
          iqamah: masjidData.today.prayers.dhuhr.iqamah,
        },
        asr: {
          adhan: masjidData.today.prayers.asr.adhan,
          iqamah: masjidData.today.prayers.asr.iqamah,
        },
        maghrib: {
          adhan: masjidData.today.prayers.maghrib.adhan,
          iqamah: masjidData.today.prayers.maghrib.iqamah,
        },
        isha: {
          adhan: masjidData.today.prayers.isha.adhan,
          iqamah: masjidData.today.prayers.isha.iqamah,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching MasjidBox prayer times:", error);
    throw error;
  }
}
