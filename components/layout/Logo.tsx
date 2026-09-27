import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
// Official logo location. The current file is a clearly marked placeholder:
// drop the supplied Studio PortMix artwork at this path to replace it.
import logo from "@/public/images/logo/studio-portmix.svg";

interface LogoProps {
  href: string;
  className?: string;
  priority?: boolean;
}

export function Logo({ href, className, priority = false }: LogoProps) {
  return (
    <Link href={href} aria-label="Studio PortMix" className={cn("inline-flex items-center", className)}>
      <Image src={logo} alt="Studio PortMix" priority={priority} className="h-7 w-auto sm:h-8" />
    </Link>
  );
}
