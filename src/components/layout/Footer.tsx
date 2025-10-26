import { Instagram, Youtube, Facebook, Link } from "lucide-react";

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-primary text-white ${className}`}>
      <div className="px-6 pb-6 mx-auto border-t border-white/20 pt-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/masjidalezz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-md transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@masjidalezz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/p/Masjid-Al-Ezz-61571134346874/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://linktr.ee/masjidalezz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors"
              aria-label="Linktree"
            >
              <Link className="h-5 w-5" />
            </a>
          </div>
          <p className="text-white/80 text-sm">
            A service of Peel Muslim Community Centre (PMCC)
          </p>
          <p className="text-white/80 text-sm">
            Copyright &copy; {new Date().getFullYear()} Masjid Al-Ezz. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
