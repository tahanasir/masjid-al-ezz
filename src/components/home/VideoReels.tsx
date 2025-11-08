import { useState, useEffect, useRef, ReactNode } from 'react';
import { ExternalLink, Volume2, VolumeX } from "lucide-react";

interface VideoReel {
  id: string;
  permalink: string;
  mediaUrl: string;
  thumbnailUrl: string;
}

interface VideoReelsProps {
  children?: (props: { hasVideos: boolean }) => ReactNode;
}

const BEHOLD_VIDEOS_URL = "https://feeds.behold.so/APoFU4ckvk1dj1J1gto8";

export function VideoReels({ children }: VideoReelsProps = {}) {
  const [reels, setReels] = useState<VideoReel[]>([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch video reels from Behold API
  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await fetch(BEHOLD_VIDEOS_URL);
        const data = await response.json();
        
        const videoPosts = data.posts
          .filter((post: any) => post.mediaType === 'VIDEO')
          .map((post: any) => ({
            id: post.id,
            permalink: post.permalink,
            mediaUrl: post.mediaUrl,
            thumbnailUrl: post.thumbnailUrl || post.mediaUrl,
          }));
          
        setReels(videoPosts);
      } catch (error) {
        console.error('Error fetching video reels:', error);
      }
    };

    fetchReels();
  }, []);

  // No longer enabling audio on any click - only when user clicks the mute button

  // Handle video play/pause based on visibility
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.volume = 1.0;
          video.muted = isMuted;
          video.play().catch(console.error);
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, {
      threshold: 0.8,
      root: containerRef.current
    });

    videoRefs.current.forEach(video => video && observer.observe(video));

    return () => {
      videoRefs.current.forEach(video => video && observer.unobserve(video));
      observer.disconnect();
    };
  }, [reels, isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMutedState = !isMuted;
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = newMutedState;
      }
    });
    setIsMuted(newMutedState);
    videoRefs.current.forEach(video => video && (video.muted = newMutedState));
  };

  const navigateToReel = (index: number) => {
    setCurrentReelIndex(index);
    videoRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  };

  // If children is provided, let the parent component handle rendering
  if (children) {
    return <>{children({ hasVideos: reels.length > 0 })}</>;
  }
  
  // If no children and no videos, return null
  if (reels.length === 0) return null;

  return (
    <div className="w-full">
      <div className="relative">
        <div 
          ref={containerRef}
          className="relative h-[70vh] overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-black/90 rounded-xl flex"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth'
          }}
        >
          {reels.map((reel, index) => (
            <div 
              key={reel.id}
              className="h-full w-full flex-shrink-0 flex items-center justify-center snap-start"
              style={{
                scrollSnapAlign: 'start',
                width: '100%',
                height: '100%'
              }}
            >
              <div className="relative w-full h-full max-w-2xl mx-4">
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={reel.mediaUrl}
                  poster={reel.thumbnailUrl}
                  className="w-full h-full object-contain"
                  playsInline
                  loop
                  preload="auto"
                  muted={isMuted}
                  onClick={(e) => {
                    e.stopPropagation();
                    const video = e.currentTarget;
                    if (video.paused) {
                      video.play();
                    } else {
                      video.pause();
                    }
                  }}
                />
                
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-opacity"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                
                <a
                  href={reel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-opacity"
                  aria-label="Open in Instagram"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {reels.length > 1 && (
          <>
            <button
              onClick={() => navigateToReel(currentReelIndex - 1)}
              disabled={currentReelIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-opacity disabled:opacity-50 disabled:cursor-not-allowed z-10"
              aria-label="Previous video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => navigateToReel(currentReelIndex + 1)}
              disabled={currentReelIndex === reels.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-opacity disabled:opacity-50 disabled:cursor-not-allowed z-10"
              aria-label="Next video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {reels.map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigateToReel(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentReelIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
