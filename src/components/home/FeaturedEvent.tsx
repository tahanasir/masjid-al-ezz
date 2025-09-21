import { useState, useEffect } from "react";

interface InstagramPost {
  id: string;
  caption: string;
  permalink: string;
  mediaUrl: string;
  timestamp: string;
  sizes: {
    small: {
      mediaUrl: string;
    };
    medium: {
      mediaUrl: string;
    };
    large: {
      mediaUrl: string;
    };
    full: {
      mediaUrl: string;
    };
  };
}

const BEHOLD_FEED_URL =
  "https://feeds.behold.so/APoFU4ckvk1dj1J1gto8";

export function FeaturedEvent() {
  const [featuredEvent, setFeaturedEvent] = useState<InstagramPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedEvent = async () => {
      try {
        console.log('Fetching Instagram feed from:', BEHOLD_FEED_URL);
        const response = await fetch(BEHOLD_FEED_URL);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
        }
        const data = await response.json();
        console.log('Fetched Instagram data:', data);
        
        // Get the most recent post
        if (data.posts && data.posts.length > 0) {
          const latestPost = data.posts[0];
          console.log('Latest post:', latestPost);
          setFeaturedEvent({
            id: latestPost.id,
            caption: latestPost.caption,
            permalink: latestPost.permalink,
            mediaUrl: latestPost.mediaUrl,
            timestamp: latestPost.timestamp,
            sizes: latestPost.sizes
          });
        }
      } catch (err) {
        setError("Failed to load featured event. Please try again later.");
        console.error("Error fetching featured event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvent();
  }, []);

  const extractEventDetails = (caption: string) => {
    // Default values
    const details = {
      title: "Upcoming Event",
      description: "Join us for our next event!",
      date: "",
      time: "",
      location: ""
    };

    if (!caption) return details;

    // Extract title (first line of caption)
    const lines = caption.split('\n').filter(line => line.trim() !== '');
    if (lines.length > 0) {
      details.title = lines[0].replace(/[\*#]/g, '').trim();
    }

    // Extract date, time, and location using common patterns
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('📅') || lowerLine.includes('date:')) {
        details.date = line.replace(/[📅:]/g, '').trim();
      } else if (lowerLine.includes('🕕') || lowerLine.includes('time:')) {
        // Extract and clean the time string, keeping the original format
        let timeStr = line
          .replace(/[🕕]/g, '')  // Remove clock emoji
          .replace(/^time:/i, '') // Remove 'time:' prefix if present
          .trim();
        
        // If the time contains 'PM' or 'AM', ensure proper spacing
        timeStr = timeStr.replace(/(\d)([AP]M)/i, '$1 $2');
        
        // Clean up any double spaces
        timeStr = timeStr.replace(/\s+/g, ' ').trim();
        
        // Set the time as is, since it's already in the correct format from Instagram
        details.time = timeStr;
      } else if (lowerLine.includes('📍') || lowerLine.includes('location:')) {
        details.location = line.replace(/[📍:]/g, '').trim();
      } else if (line.trim() && !details.description.includes(line) && line !== details.title) {
        // Add as description if not already included and not empty
        details.description += (details.description ? ' ' : '') + line.trim();
      }
    });

    // If no description was found, use the first few lines of the caption
    if (!details.description && lines.length > 1) {
      details.description = lines.slice(1, 3).join(' ').substring(0, 150) + '...';
    }

    return details;
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 h-full animate-pulse">
        <div className="h-[400px] bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-6"></div>
          <div className="h-10 bg-amber-500 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !featuredEvent) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 h-full p-6 text-center">
        <p className="text-white/80">Unable to load featured event. Please check back later.</p>
      </div>
    );
  }

  const placeholderImage = 'https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80';
  const eventDetails = featuredEvent ? extractEventDetails(featuredEvent.caption) : {
    title: 'Upcoming Event',
    description: 'Check back soon for our next event!',
    date: 'Coming Soon',
    time: '',
    location: 'Masjid Al-Ezz'
  };
  
  // Use the medium-sized image from Instagram if available, otherwise use the placeholder
  const eventImage = featuredEvent?.sizes?.medium?.mediaUrl || 
                    featuredEvent?.sizes?.large?.mediaUrl || 
                    featuredEvent?.sizes?.small?.mediaUrl || 
                    featuredEvent?.sizes?.full?.mediaUrl || 
                    featuredEvent?.mediaUrl || 
                    placeholderImage;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 h-full flex flex-col">
      <div className="bg-primary/90 py-3 px-4">
        <h2 className="text-lg font-serif text-white font-semibold">
          Featured Event
        </h2>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="relative overflow-hidden mx-auto" style={{ height: '425px', maxWidth: '80%', width: '100%' }}>
          <img 
            src={eventImage}
            alt={eventDetails.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">{eventDetails.title}</h3>
            <p className="text-white/90 text-sm whitespace-pre-line">{eventDetails.description}</p>
          </div>
          {(eventDetails.date || eventDetails.time || eventDetails.location) && (
          <div className="mt-auto space-y-2">
            {eventDetails.date && (
              <div className="flex items-center text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{eventDetails.date} {eventDetails.time && `• ${eventDetails.time}`}</span>
              </div>
            )}
            {eventDetails.location && (
              <div className="flex items-center text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{eventDetails.location}</span>
              </div>
            )}
          </div>
        )}
        
          <a 
            href={featuredEvent.permalink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 text-center text-base"
          >
            Learn More on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
