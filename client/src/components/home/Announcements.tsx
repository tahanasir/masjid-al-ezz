import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { formatDate } from "@/lib/utils";
import { Announcement } from "@shared/schema";
import { useIsMobile } from "@/hooks/use-mobile";

export function Announcements() {
  const {
    data: announcements,
    isLoading,
    error,
  } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements", { active: true }],
  });
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="text-center text-xs md:text-sm py-1 md:py-2">
        Loading announcements...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-1 md:py-2">
        <AlertCircle className="h-4 w-4 mx-auto text-red-500 mb-1" />
        <p className="text-xs text-red-500">Failed to load announcements</p>
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="text-center py-2 md:py-4">
        <Megaphone className="h-4 w-4 mx-auto text-gray-400 mb-1" />
        <p className="text-xs md:text-sm text-gray-500">
          No announcements at this time
        </p>
      </div>
    );
  }

  // Get the most recent announcements (up to 2 for larger screens, 1 for mobile)
  const displayCount = isMobile ? 1 : 2;
  const displayAnnouncements = announcements.slice(0, displayCount);

  return (
    <div className="space-y-2">
      {displayAnnouncements.map((announcement) => (
        <div key={announcement.id} className="flex items-start gap-1 md:gap-2">
          <div className="text-primary flex-shrink-0 mt-0.5">
            <Megaphone className="h-3 w-3 md:h-4 md:w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-xs md:text-sm">
              {announcement.title}
            </h3>
            <p className="text-gray-600 text-[10px] md:text-xs mb-0.5 md:mb-1 line-clamp-2">
              {announcement.content}
            </p>
            <div className="flex items-center text-[9px] md:text-[10px] text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(announcement.date)}
            </div>
          </div>
        </div>
      ))}

      {announcements.length > displayCount && (
        <div className="text-right mt-1">
          <Link
            href="/announcements"
            className="text-primary hover:text-primary/80 text-[10px] md:text-xs inline-flex items-center"
          >
            View all announcements <span className="ml-0.5 md:ml-1">›</span>
          </Link>
        </div>
      )}
    </div>
  );
}
