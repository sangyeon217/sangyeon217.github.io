import Link from "next/link";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          Sangyeon&apos;s Tech Blog
        </Link>

        <div className="flex items-center gap-4 text-2xl text-gray-700">
          <a
            href="https://github.com/sangyeon217"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            <AiFillGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sangyeon-song-301383202/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            <AiFillLinkedin />
          </a>
        </div>
      </div>
    </header>
  );
}
