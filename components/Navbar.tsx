"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = ({ isAuth }: { isAuth: boolean }) => {
  const pathname = usePathname();

  const LINKS = !isAuth
    ? [
        { href: "/", name: "Home" },
        { href: "/login", name: "Login" },
      ]
    : [
        { href: "/", name: "Home" },
        { href: "/links", name: "Links" },
        { href: "/profile", name: "Profile" },
      ];

  return (
    <header className="fixed left-0 top-0 py-4 z-10 mx-auto px-4 sm:px-10 w-full bordr border-b-[1px] border-main-3 shadow-sm">
      <div className="flex justify-between items-center">
        <Link aria-label="Logo" href={"/"} className="">
          <Image
            src={"/MYLOGO.svg"}
            width={60}
            height={60}
            alt="Logo"
            className="mr-auto object-contain w-10 h-10"
          />
        </Link>

        <div className="justify-center items-center gap-5 md:flex hidden">
          {LINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "text-lg capitalize font-normal text-secondary-foreground hover:text-primary transition-colors",
                {
                  "text-primary": pathname === link.href,
                }
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
