import { cn } from "@/lib/utils";

interface SectionDividerProps {
    className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
    return (
        <div className={cn("w-full flex items-center justify-center py-8", className)}>
            <div className="w-full max-w-4xl flex items-center gap-4 px-4">
                {/* Left Line */}
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-amber-500"></div>

                {/* Center Geometric Pattern */}
                <div className="flex-shrink-0 text-amber-500 relative">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 opacity-80">
                        <path d="M20 0L24.49 4.49L20 8.98L15.51 4.49L20 0Z" fill="currentColor" />
                        <path d="M40 20L35.51 24.49L31.02 20L35.51 15.51L40 20Z" fill="currentColor" />
                        <path d="M20 40L15.51 35.51L20 31.02L24.49 35.51L20 40Z" fill="currentColor" />
                        <path d="M0 20L4.49 15.51L8.98 20L4.49 24.49L0 20Z" fill="currentColor" />
                        <rect x="14.14" y="14.14" width="11.72" height="11.72" transform="rotate(45 20 20)" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="10" y="10" width="20" height="20" transform="rotate(0 20 20)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                    </svg>
                </div>

                {/* Right Line */}
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-300/50 to-amber-500"></div>
            </div>
        </div>
    );
}
