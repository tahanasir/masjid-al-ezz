import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface InstagramPost {
  id: string;
  permalink: string;
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  caption?: string;
  thumbnailUrl?: string;
}

interface InstagramFeedData {
  posts: InstagramPost[];
}

const BEHOLD_FEED_URL = "https://feeds.behold.so/APoFU4ckvk1dj1J1gto8";

export function InstagramEvents() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    const fetchPosts = async () => {
      try {
        const response = await fetch(BEHOLD_FEED_URL);
        const data: InstagramFeedData = await response.json();
        // Filter for image posts only
        const imagePosts = data.posts.filter(post => post.mediaType === 'IMAGE');
        setPosts(imagePosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching Instagram posts:", err);
        setError("Failed to load Instagram posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-serif text-primary">
            Instagram Gallery
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse text-gray-500 flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Loading Instagram gallery...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || posts.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-serif text-primary">
            Instagram Gallery
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {error || 'No Instagram posts available at the moment.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative h-full">
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
        className="flex space-x-6 overflow-x-auto snap-x snap-mandatory w-full py-8 h-full px-4 no-scrollbar items-center"
      >
        {posts.map((post) => (
          <div
            key={post.id}
            data-post
            className="flex-none h-full w-auto aspect-[4/5] snap-center group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() =>
              window.open(post.permalink, "_blank", "noopener,noreferrer")
            }
          >
            <div className="relative w-full h-full aspect-[3/4] md:aspect-[4/5] overflow-hidden">
              <img
                src={post.mediaUrl}
                alt={post.caption || 'Instagram post'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
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
