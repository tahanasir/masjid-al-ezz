import * as React from "react";
import { useWeeklyPrayerTimes } from "@/hooks/usePrayerTimes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Volume2, Clock } from "lucide-react";

interface PrayerTimesTableProps {
  view: "thisWeek" | "nextWeek";
}

export function PrayerTimesTable({ view }: PrayerTimesTableProps) {
  const { data: weeklyPrayerTimes, isLoading, error } = useWeeklyPrayerTimes();
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="py-1 px-1 md:py-2 md:px-2 text-left text-xs md:text-sm">
                Day
              </TableHead>
              <TableHead
                className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm"
                colSpan={2}
              >
                Fajr
              </TableHead>
              <TableHead
                className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm"
                colSpan={2}
              >
                Dhuhr
              </TableHead>
              <TableHead
                className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm"
                colSpan={2}
              >
                Asr
              </TableHead>
              <TableHead
                className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm"
                colSpan={2}
              >
                Maghrib
              </TableHead>
              <TableHead
                className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm"
                colSpan={2}
              >
                Isha
              </TableHead>
              <TableHead className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm">
                Jumu'ah
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2">
                    <Skeleton className="h-4 md:h-6 w-12 md:w-24" />
                    <Skeleton className="h-3 md:h-4 w-8 md:w-16 mt-1" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                  <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center">
                    <Skeleton className="h-4 md:h-6 w-8 md:w-12 mx-auto" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 md:p-4 text-center text-red-500 text-xs md:text-sm">
        Failed to load prayer times. Please try again later.
      </div>
    );
  }

  // Only show today and tomorrow's prayer times
  const displayData = weeklyPrayerTimes ? weeklyPrayerTimes.slice(0, 2) : [];

  // For very small screens, use a more compact layout
  if (isMobile && window.innerWidth < 420) {
    return (
      <div className="overflow-x-auto">
        {/* Legend */}
        <div className="flex justify-end items-center text-[8px] text-gray-600 mb-1 space-x-3 px-1">
          <div className="flex items-center">
            <Volume2 className="h-2.5 w-2.5 mr-0.5 text-primary" />
            <span>Adhan</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-2.5 w-2.5 mr-0.5 text-amber-500" />
            <span>Iqamah</span>
          </div>
        </div>

        <Table className="w-full min-w-full text-[10px]">
          <TableHeader>
            <TableRow className="bg-primary/10">
              <TableHead className="py-0.5 px-1 text-left text-primary font-semibold">
                Day
              </TableHead>
              <TableHead className="py-0.5 px-1 text-center text-primary font-semibold">
                Fajr
              </TableHead>
              <TableHead className="py-0.5 px-1 text-center text-primary font-semibold">
                Dhuhr
              </TableHead>
              <TableHead className="py-0.5 px-1 text-center text-primary font-semibold">
                Asr
              </TableHead>
              <TableHead className="py-0.5 px-1 text-center text-primary font-semibold">
                Maghrib
              </TableHead>
              <TableHead className="py-0.5 px-1 text-center text-primary font-semibold">
                Isha
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((day, index) => (
              <React.Fragment key={index}>
                <TableRow
                  className={`
                    border-b border-gray-100 hover:bg-muted transition-colors text-[9px]
                    ${index === 0 ? "bg-primary/5 font-medium" : ""}
                    ${day.day === "Friday" ? "bg-amber-50" : ""}
                  `}
                >
                  <TableCell className="py-0.5 px-1 font-semibold" rowSpan={2}>
                    {index === 0 ? "Today" : "Tom."}
                    <br />
                    <span className="text-[8px] text-gray-500">
                      {day.readable.split(",")[0]}
                    </span>
                    {day.jummuah && (
                      <div className="mt-1 text-[8px] font-normal bg-amber-100 text-primary rounded px-1 py-0.5 inline-block">
                        Jumu'ah: {day.jummuah}
                      </div>
                    )}
                  </TableCell>
                  {/* Adhan row */}
                  <TableCell className="py-0.5 px-1 text-center relative">
                    <Volume2 className="h-2 w-2 inline mr-0.5 text-primary" />
                    {day.fajr}
                  </TableCell>
                  <TableCell className="py-0.5 px-1 text-center">
                    <Volume2 className="h-2 w-2 inline mr-0.5 text-primary" />
                    {day.dhuhr}
                  </TableCell>
                  <TableCell className="py-0.5 px-1 text-center">
                    <Volume2 className="h-2 w-2 inline mr-0.5 text-primary" />
                    {day.asr}
                  </TableCell>
                  <TableCell className="py-0.5 px-1 text-center">
                    <Volume2 className="h-2 w-2 inline mr-0.5 text-primary" />
                    {day.maghrib}
                  </TableCell>
                  <TableCell className="py-0.5 px-1 text-center">
                    <Volume2 className="h-2 w-2 inline mr-0.5 text-primary" />
                    {day.isha}
                  </TableCell>
                </TableRow>
                <TableRow
                  className={`
                    border-b border-gray-100 hover:bg-muted/50 transition-colors text-[9px]
                    ${index === 0 ? "bg-primary/5 font-medium" : ""}
                    ${day.day === "Friday" ? "bg-amber-50/50" : ""}
                  `}
                >
                  {/* Iqamah row */}
                  <TableCell className="py-0.5 px-1 text-center">
                    <Clock className="h-2 w-2 inline mr-0.5 text-amber-500" />
                    {day.fajrIqamah}
                  </TableCell>
                  <TableCell className="py-0.5 px-1 text-center">
                    <Clock className="h-2 w-2 inline mr-0.5 text-amber-500" />
                    {day.dhuhrIqamah}
                  </TableCell>
                  <TableCell className="py-0.5 px-1 text-center">
                    <Clock className="h-2 w-2 inline mr-0.5 text-amber-500" />
                    {day.asrIqamah}
                  </TableCell>
                  <TableCell className="py-0.5 px-1 text-center">
                    <Clock className="h-2 w-2 inline mr-0.5 text-amber-500" />
                    {day.maghribIqamah}
                  </TableCell>
                  <TableCell className="py-0.5 px-1 text-center">
                    <Clock className="h-2 w-2 inline mr-0.5 text-amber-500" />
                    {day.ishaIqamah}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Legend */}
      <div className="flex justify-end items-center text-xs text-gray-600 mb-1 space-x-4 px-2">
        <div className="flex items-center">
          <Volume2 className="h-3 w-3 mr-1 text-primary" />
          <span>Adhan (Call to Prayer)</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1 text-amber-500" />
          <span>Iqamah (Congregation Start)</span>
        </div>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-primary/10">
            <TableHead
              className="py-1 px-1 md:py-2 md:px-2 text-left text-primary font-semibold text-xs md:text-sm"
              rowSpan={2}
            >
              Day
            </TableHead>
            <TableHead
              className="py-1 px-1 md:py-2 md:px-2 text-center text-primary font-semibold text-xs md:text-sm"
              colSpan={2}
            >
              Fajr
            </TableHead>
            <TableHead
              className="py-1 px-1 md:py-2 md:px-2 text-center text-primary font-semibold text-xs md:text-sm"
              colSpan={2}
            >
              Dhuhr
            </TableHead>
            <TableHead
              className="py-1 px-1 md:py-2 md:px-2 text-center text-primary font-semibold text-xs md:text-sm"
              colSpan={2}
            >
              Asr
            </TableHead>
            <TableHead
              className="py-1 px-1 md:py-2 md:px-2 text-center text-primary font-semibold text-xs md:text-sm"
              colSpan={2}
            >
              Maghrib
            </TableHead>
            <TableHead
              className="py-1 px-1 md:py-2 md:px-2 text-center text-primary font-semibold text-xs md:text-sm"
              colSpan={2}
            >
              Isha
            </TableHead>
            <TableHead
              className="py-1 px-1 md:py-2 md:px-2 text-center text-primary font-semibold text-xs md:text-sm"
              rowSpan={2}
            >
              Jumu'ah
            </TableHead>
          </TableRow>
          <TableRow className="bg-primary/5 text-[10px] md:text-xs">
            <TableHead className="py-0.5 px-1 text-center text-primary/80 font-medium">
              <Volume2 className="h-3 w-3 inline mr-1 text-primary" />
              Adhan
            </TableHead>
            <TableHead className="py-0.5 px-1 text-center text-amber-500/80 font-medium">
              <Clock className="h-3 w-3 inline mr-1 text-amber-500" />
              Iqamah
            </TableHead>
            <TableHead className="py-0.5 px-1 text-center text-primary/80 font-medium">
              <Volume2 className="h-3 w-3 inline mr-1 text-primary" />
              Adhan
            </TableHead>
            <TableHead className="py-0.5 px-1 text-center text-amber-500/80 font-medium">
              <Clock className="h-3 w-3 inline mr-1 text-amber-500" />
              Iqamah
            </TableHead>
            <TableHead className="py-0.5 px-1 text-center text-primary/80 font-medium">
              <Volume2 className="h-3 w-3 inline mr-1 text-primary" />
              Adhan
            </TableHead>
            <TableHead className="py-0.5 px-1 text-center text-amber-500/80 font-medium">
              <Clock className="h-3 w-3 inline mr-1 text-amber-500" />
              Iqamah
            </TableHead>
            <TableHead className="py-0.5 px-1 text-center text-primary/80 font-medium">
              <Volume2 className="h-3 w-3 inline mr-1 text-primary" />
              Adhan
            </TableHead>
            <TableHead className="py-0.5 px-1 text-center text-amber-500/80 font-medium">
              <Clock className="h-3 w-3 inline mr-1 text-amber-500" />
              Iqamah
            </TableHead>
            <TableHead className="py-0.5 px-1 text-center text-primary/80 font-medium">
              <Volume2 className="h-3 w-3 inline mr-1 text-primary" />
              Adhan
            </TableHead>
            <TableHead className="py-0.5 px-1 text-center text-amber-500/80 font-medium">
              <Clock className="h-3 w-3 inline mr-1 text-amber-500" />
              Iqamah
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((day, index) => (
            <TableRow
              key={index}
              className={`
                border-b border-gray-100 hover:bg-muted transition-colors
                ${index === 0 ? "bg-primary/5 font-medium" : ""}
                ${day.day === "Friday" ? "bg-amber-50" : ""}
              `}
            >
              <TableCell className="py-1 px-1 md:py-2 md:px-2 font-semibold text-xs md:text-sm">
                {index === 0 ? "Today" : "Tomorrow"}
                <br />
                <span className="text-[10px] md:text-xs text-gray-500">
                  {day.readable}
                </span>
              </TableCell>
              {/* Fajr */}
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm">
                {day.fajr}
              </TableCell>
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm font-medium text-amber-600">
                {day.fajrIqamah}
              </TableCell>

              {/* Dhuhr */}
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm">
                {day.dhuhr}
              </TableCell>
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm font-medium text-amber-600">
                {day.dhuhrIqamah}
              </TableCell>

              {/* Asr */}
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm">
                {day.asr}
              </TableCell>
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm font-medium text-amber-600">
                {day.asrIqamah}
              </TableCell>

              {/* Maghrib */}
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm">
                {day.maghrib}
              </TableCell>
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm font-medium text-amber-600">
                {day.maghribIqamah}
              </TableCell>

              {/* Isha */}
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm">
                {day.isha}
              </TableCell>
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center text-xs md:text-sm font-medium text-amber-600">
                {day.ishaIqamah}
              </TableCell>

              {/* Jumu'ah */}
              <TableCell className="py-1 px-1 md:py-2 md:px-2 text-center font-semibold text-primary text-xs md:text-sm">
                {day.jummuah || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
