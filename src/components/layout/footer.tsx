import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";


const categories = [
  { label: "Recent property", href: "/properties" },
  { label: "To Sell", href: "/properties?type=sell" },
  { label: "To Buy", href: "/properties?type=buy" },
  { label: "To Rent", href: "/properties?type=rent" },
];

const links = [
  { label: "Latest News", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "FAQ Page", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const socials = [
  { icon: FaInstagram, href: "https://instagram.com" },
  { icon: FaFacebook, href: "https://facebook.com" },
  { icon: FaYoutube, href: "https://youtube.com" },
  { icon: FaXTwitter, href: "https://twitter.com" },
];

async function Copyright() {
  await connection();
  const year = new Date().getFullYear();
  return <>{year}</>;
}

export async function Footer() {

  return (
    <footer className="border-t bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="text-xl font-bold">
            RentNest
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            A contemporary real estate platform equipped with every option,
            element and feature your property search may need.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
            Contact us
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Staten Island, NY 10314, USA</li>
            <li>
              <a href="tel:+11122236945">+1 112 223 6945</a>
            </li>
            <li>
              <a href="mailto:hello@newhome.com">hello@rentnest.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
            Categories
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="hover:text-foreground">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
            Links
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row">
        <p>© <Suspense fallback="..."><Copyright /></Suspense> RentNest. All Rights Reserved.</p>
        <div className="flex gap-4">
          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}