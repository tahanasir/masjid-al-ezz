import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function MasjidBoxWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef(`widget-${Date.now()}`);

  useEffect(() => {
    // Clear any existing scripts to force refresh
    const existingScripts = document.querySelectorAll('script[src*="masjidbox.com"]');
    existingScripts.forEach(script => script.remove());
    
    // Force refresh by adding timestamp to script
    const asyncLoad = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = `https://masjidbox.com/widgets/loader.js?v=${Date.now()}`;
      
      const existingScript = document.getElementsByTagName('script')[0];
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.insertBefore(script, existingScript);
      } else {
        document.head.appendChild(script);
      }
    };
    
    // Execute the loader function
    asyncLoad();
    
    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[src*="masjidbox.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden rounded-md">
      {/* Use the exact anchor tag format provided with refresh key */}
      <a 
        data-masjidbox-widget="jivuHKpfu2DvfPhEs9AdL" 
        data-masjidbox-ifr 
        href={`https://masjidbox.com/prayer-times/masjid-al-ezz?refresh=${Date.now()}`}
        className="w-full h-full min-h-[300px] block"
        key={widgetId.current}
      >
        <LoadingSkeleton />
      </a>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm p-4">
      <div className="text-center mb-4">
        <Skeleton className="h-5 w-40 mx-auto mb-2" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      
      <div className="space-y-3 mt-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="flex justify-between items-center">
            <Skeleton className="h-4 w-16" />
            <div className="flex space-x-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Skeleton className="h-3 w-28 mx-auto" />
      </div>
    </div>
  );
}