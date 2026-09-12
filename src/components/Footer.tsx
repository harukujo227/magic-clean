import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { FooterMap } from "@/components/FooterMap";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/78">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.1fr_0.8fr_0.9fr_1.1fr] lg:px-8">
        <div>
          <Image
            src="/images/logo.png"
            alt="Magic Clean Cleaning Services"
            width={200}
            height={72}
            className="mb-4 h-14 w-auto"
          />
          <p className="max-w-[28ch] leading-relaxed">
            House and office cleaning across {site.area}.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-aqua-soft">
            Explore
          </p>
          <div className="grid gap-2">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-aqua-soft">
            Contact
          </p>
          <div className="grid gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 font-semibold text-aqua-soft hover:text-white"
            >
              <Phone className="size-4" aria-hidden />
              {site.phoneDisplay}
            </a>
            <a
              href={site.emailHref}
              className="inline-flex items-start gap-2 break-all font-semibold text-aqua-soft hover:text-white"
            >
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
              {site.email}
            </a>
            <p className="inline-flex items-start gap-2 text-white/70">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-aqua-soft"
                aria-hidden
              />
              <span>{site.companyAddress.display}</span>
            </p>
          </div>
        </div>

        <FooterMap />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Yaxley · Peterborough · Cambridgeshire</p>
        </div>
      </div>
    </footer>
  );
}
