import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import 'highlight.js/styles/github.css';

export const metadata: Metadata = {
  title: "Junaid Bhura - Blog",
  description: "Junaid Bhura's blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo">
          <Image
              src="/logo-jb.svg"
              alt="Junaid Bhura logo"
              width={55}
              height={55}
              priority
          />
        </a>
        <p>Junaid Bhura a web developer in Melbourne, Australia - specializing in WordPress development.</p>
        <ul className="header__social">
          <li><a href="https://github.com/junaidbhura/" target="_blank"
                 rel="noreferrer noopener">
            <Image
              src="/github.svg"
                alt="Junaid Bhura logo"
                width={22}
                height={22}
                priority
            />
          </a></li>
          <li><a href="https://twitter.com/junaidbhura" target="_blank"
                 rel="noreferrer noopener">
            <Image
              src="/twitter.svg"
                alt="Junaid Bhura logo"
                width={22}
                height={22}
                priority
            />
          </a></li>
          <li><a href="https://profiles.wordpress.org/junaidbhura/" target="_blank"
                 rel="noreferrer noopener">
            <Image
              src="/wordpress.svg"
                alt="Junaid Bhura logo"
                width={22}
                height={22}
                priority
            />
          </a></li>
          <li><a href="https://www.linkedin.com/in/junaidbhura/" target="_blank"
                 rel="noreferrer noopener">
            <Image
              src="/linkedin.svg"
                alt="Junaid Bhura logo"
                width={22}
                height={22}
                priority
            />
          </a></li>
        </ul>
      </div>
    </header>
    {children}
    </body>
    </html>
  );
}
