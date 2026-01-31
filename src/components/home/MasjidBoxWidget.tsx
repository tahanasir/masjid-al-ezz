import { LoaderCircle } from "lucide-react";

export function MasjidBoxWidget() {
  return (
    <div className="relative w-full h-full min-h-[900px] bg-white rounded-xl overflow-hidden border border-white/20">
      <div className="absolute inset-0 flex items-center justify-center z-0 text-primary">
        <LoaderCircle className="animate-spin w-12 h-12" />
      </div>

      <iframe
        src="https://masjidbox.com/prayer-times/masjid-al-ezz"
        className="absolute inset-0 w-full h-full z-10"
        loading="eager"
        title="Prayer Times"
      />
    </div>
  );
}
