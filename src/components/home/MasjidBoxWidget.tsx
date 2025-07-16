export function MasjidBoxWidget() {
  return (
    <div className="w-full overflow-hidden rounded-md">
      <iframe
        src="https://masjidbox.com/prayer-times/masjid-al-ezz"
        className="w-full h-[33.5rem] border-0 rounded-md"
        title="Masjid Al-Ezz Prayer Times"
        loading="eager"
      />
    </div>
  );
}
