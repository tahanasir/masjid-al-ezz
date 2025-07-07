import { useQuery } from "@tanstack/react-query";
import {
  fetchPrayerTimes,
  fetchWeeklyPrayerTimes,
  fetchMasjidBoxPrayerTimes,
  type PrayerTimesData,
  type WeeklyPrayerTime,
  type MasjidBoxPrayerTimes,
} from "@/lib/prayerTimes";

export function usePrayerTimes(date?: Date) {
  return useQuery<PrayerTimesData>({
    queryKey: [
      "/api/prayer-times",
      date?.toISOString().split("T")[0] || "today",
      Date.now(),
    ],
    refetchInterval: 60 * 1000 * 15, // Refetch every 15 minutes
    refetchOnWindowFocus: true,
    staleTime: 0, // Always consider data stale to force fresh fetches
  });
}

export function useWeeklyPrayerTimes() {
  return useQuery<WeeklyPrayerTime[]>({
    queryKey: ["/api/prayer-times/week", Date.now()],
    refetchInterval: 60 * 1000 * 15, // Refetch every 15 minutes
    refetchOnWindowFocus: true,
    staleTime: 0, // Always consider data stale to force fresh fetches
  });
}

export function useMasjidBoxPrayerTimes() {
  return useQuery<MasjidBoxPrayerTimes>({
    queryKey: ["masjidbox-prayer-times", Date.now()],
    queryFn: fetchMasjidBoxPrayerTimes,
    refetchInterval: 60 * 1000 * 15, // Refetch every 15 minutes
    refetchOnWindowFocus: true,
    staleTime: 0, // Always consider data stale to force fresh fetches
    retry: 3,
  });
}
