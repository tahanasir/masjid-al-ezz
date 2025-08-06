import { LoaderCircle } from "lucide-react";

export function MasjidBoxWidget() {
  return (
    <div className="relative w-full h-[75vh] 2xl:h-[60vh] bg-white">
      <div className="absolute inset-0 flex items-center justify-center z-0 text-primary">
        <LoaderCircle className="animate-spin w-12 h-12" />
      </div>

      <iframe
        src="https://masjidbox.com/prayer-times/masjid-al-ezz"
        className="absolute inset-0 w-full h-full z-10"
        loading="eager"
      />
    </div>
  );
}
