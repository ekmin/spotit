"use client";

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  function AuthLinks() {
    const { data: session } = useSession();

    if (session) {
      return (
        <div className="flex items-center space-x-5">
          <Link
            href="/products"
            className="text-secondary-color font-semibold hover:text-secondary-dark-color transition duration-300 ease-in-out hover:scale-110"
          >
            Find
          </Link>
          <Link
            href="/compare"
            className="text-secondary-color font-semibold hover:text-secondary-dark-color transition duration-300 ease-in-out hover:scale-110"
          >
            Compare
          </Link>
          <Link
            href="/guide"
            className="text-secondary-color font-semibold hover:text-secondary-dark-color transition duration-300 ease-in-out hover:scale-110"
          >
            Guide
          </Link>
          <button
            className="bg-secondary-color hover:bg-secondary-dark-color hover:rotate-6 transition duration-300 ease-in-out md:w-28 md:h-10 md:text-sm rounded-lg text-xs text-primary-color w-20 h-8"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      );
    }
    return (
      <button
        className="bg-secondary-color hover:bg-secondary-dark-color hover:rotate-6 transition duration-300 ease-in-out md:w-28 md:h-10 md:text-sm rounded-lg text-xs text-primary-color w-20 h-8"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    );
  }

  return (
    <nav className="flex items-center justify-between px-4 py-4 mb-8 border-b font-medium shadow-sm 2xl:px-8">
      <Link
        href="/"
        className="md:text-3xl text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-secondary-dark-color to-primary-dark-color  transition duration-300 ease-in-out hover:scale-110"
      >
        SPOTIT
      </Link>
      <AuthLinks />
    </nav>
  );
};

export default Navbar;
