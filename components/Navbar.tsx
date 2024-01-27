"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { BaggageClaim } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Clothings", href: "/Clothings" },
  { name: "Electronics", href: "/Electronics" },
  { name: "Books", href: "/Books" },
];

export default function Navbar() {
  const { cartCount } = useShoppingCart();

  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();

  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Glamp <span className="text-primary">Store</span>
          </h1>
        </Link>
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="flex divide-x border-r sm:border-l">
          <Button
            variant={"outline"}
            onClick={() => handleCartClick()}
            className="flex flex-row   h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <div className="flex flex-col ml-4 gap-y-1.5">
              <BaggageClaim />
              <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                Cart
              </span>
            </div>

            <span className=" w-full h-full mt-6 mr-4 ml-0 text-primary">
              {cartCount}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
