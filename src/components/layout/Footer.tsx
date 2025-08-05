export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="px-6 pb-6 mx-auto border-t border-white/20 pt-6 text-center">
        <p className="text-white/80 text-sm">
          Copyright &copy; {new Date().getFullYear()} Masjid Al-Ezz. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
