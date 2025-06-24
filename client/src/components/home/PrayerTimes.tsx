import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, Info } from "lucide-react";
import { PrayerTimesTable } from "./PrayerTimesTable";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useIsMobile } from "@/hooks/use-mobile";

export function PrayerTimes() {
  const [currentView, setCurrentView] = useState<'thisWeek' | 'nextWeek' | 'masjidBox'>('thisWeek');
  const { data: prayerTimes } = usePrayerTimes();
  const isMobile = useIsMobile();
  
  return (
    <div>
      <div className="flex gap-1 justify-center mb-2">
        <Button 
          variant={currentView === 'thisWeek' ? "default" : "outline"} 
          size="sm"
          className={currentView === 'thisWeek' 
            ? "bg-primary text-white hover:bg-primary/90 text-xs h-6 px-2" 
            : "bg-transparent text-primary border-primary text-xs h-6 px-2"}
          onClick={() => setCurrentView('thisWeek')}
        >
          Today
        </Button>
        <Button 
          variant={currentView === 'nextWeek' ? "default" : "outline"} 
          size="sm"
          className={currentView === 'nextWeek' 
            ? "bg-primary text-white hover:bg-primary/90 text-xs h-6 px-2" 
            : "bg-transparent text-primary border-primary text-xs h-6 px-2"}
          onClick={() => setCurrentView('nextWeek')}
        >
          Tomorrow
        </Button>
        <Button 
          variant={currentView === 'masjidBox' ? "default" : "outline"} 
          size="sm"
          className={currentView === 'masjidBox' 
            ? "bg-primary text-white hover:bg-primary/90 text-xs h-6 px-2" 
            : "bg-transparent text-primary border-primary text-xs h-6 px-2"}
          onClick={() => setCurrentView('masjidBox')}
        >
          MasjidBox
        </Button>
      </div>
      
      {currentView === 'masjidBox' ? (
        <div className="overflow-hidden rounded-md border border-gray-200">
          <iframe 
            src="https://masjidbox.com/prayer-times/masjid-al-ezz-peel-muslim-community-centre/embed" 
            className="w-full"
            style={{ height: isMobile ? '280px' : '320px' }}
            title="MasjidBox Prayer Times"
          ></iframe>
        </div>
      ) : (
        <PrayerTimesTable view={currentView} />
      )}
      
      <div className="px-2 py-1 bg-muted/50 flex items-center justify-between text-[10px]">
        <p className="text-gray-700 flex items-center">
          <Info className="text-primary mr-1 h-3 w-3" />
          Powered by MasjidBox
        </p>
        {prayerTimes?.masjidBoxUrl && (
          <a 
            href={prayerTimes.masjidBoxUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center text-[10px]"
          >
            <Download className="mr-1 h-3 w-3" /> Full Schedule
          </a>
        )}
      </div>
    </div>
  );
}
