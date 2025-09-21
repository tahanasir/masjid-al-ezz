import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface InstagramPost {
  id: string;
  permalink: string;
  sizes: {
    full: {
      mediaUrl: string;
    };
  };
}

interface InstagramFeedData {
  posts: InstagramPost[];
}

const BEHOLD_FEED_URL =
  "https://feeds.behold.so/APoFU4ckvk1dj1J1gto8";

export function InstagramEvents() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollToNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Get the first post element to calculate actual width
    const firstPost = container.querySelector("div[data-post]") as HTMLElement;
    if (!firstPost) return;

    // Calculate the actual width including margins
    const postRect = firstPost.getBoundingClientRect();
    const postWidth = postRect.width + 24;

    container.scrollBy({
      left: postWidth,
      behavior: "smooth",
    });
  };

  const scrollToPrev = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Get the first post element to calculate actual width
    const firstPost = container.querySelector("div[data-post]") as HTMLElement;
    if (!firstPost) return;

    // Calculate the actual width including margins
    const postRect = firstPost.getBoundingClientRect();
    const postWidth = postRect.width + 24; // 24px is the gap (space-x-6 = 1.5rem = 24px)

    container.scrollBy({
      left: -postWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollButtons();
    container.addEventListener("scroll", checkScrollButtons);

    return () => container.removeEventListener("scroll", checkScrollButtons);
  }, [posts]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(BEHOLD_FEED_URL);
        if (!response.ok) throw new Error("Failed to fetch Instagram posts.");
        const data: InstagramFeedData = await response.json();

        // Random shuffle (biased)
        data.posts.sort(() => 0.5 - Math.random());

        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchInstagramPosts();
  }, []);

  if (loading || error) {
    return (
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-scroll no-scrollbar py-4"
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <Card
              key={idx}
              className="flex-none h-[600px] aspect-[4/5] overflow-hidden animate-pulse"
            >
              <div className="bg-gray-200 aspect-square"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={scrollToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
          aria-label="Scroll to previous post"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
      )}

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={scrollToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
          aria-label="Scroll to next post"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      )}

      {/* Posts container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-scroll no-scrollbar py-4"
      >
        {posts.map((post) => (
          <div
            key={post.id}
            data-post
            className="flex-none overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() =>
              window.open(post.permalink, "_blank", "noopener,noreferrer")
            }
          >
            <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[480px] aspect-[4/5] overflow-hidden">
              <img
                src={post.sizes.full.mediaUrl}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
