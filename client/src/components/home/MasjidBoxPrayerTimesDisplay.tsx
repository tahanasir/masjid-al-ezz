import { useMasjidBoxPrayerTimes } from "@/hooks/usePrayerTimes";
import { Skeleton } from "@/components/ui/skeleton";

export function MasjidBoxPrayerTimesDisplay() {
  const { data: prayerTimes, isLoading, error } = useMasjidBoxPrayerTimes();

  if (isLoading) {
    return <PrayerTimesSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
        <p className="text-red-600 text-sm">
          Unable to load prayer times from MasjidBox. Please check back later.
        </p>
      </div>
    );
  }

  if (!prayerTimes) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-center">
        <p className="text-amber-700 text-sm">
          Prayer times data is not available at the moment.
        </p>
      </div>
    );
  }

  const prayers = [
    {
      name: "Fajr",
      adhan: prayerTimes.prayers.fajr.adhan,
      iqamah: prayerTimes.prayers.fajr.iqamah,
    },
    { name: "Sunrise", adhan: prayerTimes.prayers.sunrise.adhan, iqamah: null },
    {
      name: "Dhuhr",
      adhan: prayerTimes.prayers.dhuhr.adhan,
      iqamah: prayerTimes.prayers.dhuhr.iqamah,
    },
    {
      name: "Asr",
      adhan: prayerTimes.prayers.asr.adhan,
      iqamah: prayerTimes.prayers.asr.iqamah,
    },
    {
      name: "Maghrib",
      adhan: prayerTimes.prayers.maghrib.adhan,
      iqamah: prayerTimes.prayers.maghrib.iqamah,
    },
    {
      name: "Isha",
      adhan: prayerTimes.prayers.isha.adhan,
      iqamah: prayerTimes.prayers.isha.iqamah,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
      <div className="px-4 py-3 bg-primary text-white text-center">
        <h3 className="text-sm font-medium">Today's Prayer Times</h3>
        <p className="text-xs text-white/80 mt-1">
          {prayerTimes.date} ({prayerTimes.hijriDate})
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-3 text-left font-medium text-gray-600">
                Prayer
              </th>
              <th className="py-2 px-3 text-center font-medium text-gray-600">
                Adhan
              </th>
              <th className="py-2 px-3 text-center font-medium text-gray-600">
                Iqamah
              </th>
            </tr>
          </thead>
          <tbody>
            {prayers.map((prayer, index) => (
              <tr
                key={prayer.name}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2.5 px-3 font-medium text-primary">
                  {prayer.name}
                </td>
                <td className="py-2.5 px-3 text-center">{prayer.adhan}</td>
                <td className="py-2.5 px-3 text-center">
                  {prayer.iqamah || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-200 flex justify-center">
        <a
          href="https://masjidbox.com/prayer-times/masjid-al-ezz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary hover:underline"
        >
          Source: MasjidBox
        </a>
      </div>
    </div>
  );
}

function PrayerTimesSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
      <div className="px-4 py-3 bg-primary/80 text-white text-center">
        <Skeleton className="h-4 w-40 mb-1 bg-white/20 mx-auto" />
        <Skeleton className="h-3 w-32 bg-white/10 mx-auto" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-3 text-left font-medium text-gray-400 w-1/3">
                <Skeleton className="h-4 w-16 bg-gray-200" />
              </th>
              <th className="py-2 px-3 text-center font-medium text-gray-400 w-1/3">
                <Skeleton className="h-4 w-16 bg-gray-200 mx-auto" />
              </th>
              <th className="py-2 px-3 text-center font-medium text-gray-400 w-1/3">
                <Skeleton className="h-4 w-16 bg-gray-200 mx-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <tr
                key={item}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2.5 px-3">
                  <Skeleton className="h-4 w-12 bg-gray-200" />
                </td>
                <td className="py-2.5 px-3 text-center">
                  <Skeleton className="h-4 w-16 bg-gray-200 mx-auto" />
                </td>
                <td className="py-2.5 px-3 text-center">
                  <Skeleton className="h-4 w-16 bg-gray-200 mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-3 py-2 bg-gray-50 text-xs text-center border-t border-gray-200">
        <Skeleton className="h-3 w-28 bg-gray-200 mx-auto" />
      </div>
    </div>
  );
}
