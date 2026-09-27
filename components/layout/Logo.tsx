import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
// Official Studio PortMix logo (cropped from the supplied PortMix-Studio-logo.png).
import logo from "@/public/images/logo/studio-portmix.png";

interface LogoProps {
  href: string;
  className?: string;
  priority?: boolean;
}

export function Logo({ href, className, priority = false }: LogoProps) {
  return (
    <Link href={href} aria-label="Studio PortMix" className={cn("inline-flex items-center", className)}>
      <Image
        src={logo}
        alt="Studio PortMix"
        priority={priority}
        sizes="(min-width: 1024px) 180px, 140px"
        className="h-9 w-auto min-[400px]:h-10 sm:h-11 lg:h-[52px]"
      />
    </Link>
  );
}
