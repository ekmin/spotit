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
            className="text-primary-color font-semibold hover:text-primary-dark-color transition duration-300 ease-in-out hover:scale-110"
          >
            Find
          </Link>
          <Link
            href="/compare"
            className="text-primary-color font-semibold hover:text-primary-dark-color transition duration-300 ease-in-out hover:scale-110"
          >
            Compare
          </Link>
          <button
            className="bg-primary-color hover:bg-primary-dark-color hover:rotate-6 transition duration-300 ease-in-out md:w-28 md:h-10 md:text-sm rounded-lg text-xs w-20 h-8"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      );
    }
    return (
      <button
        className="bg-primary-color hover:bg-primary-dark-color hover:rotate-6 transition duration-300 ease-in-out md:w-28 md:h-10 md:text-sm rounded-lg text-xs w-20 h-8"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    );
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-secondary-color p-4 mb-8">
      <Link
        href="/"
        className="md:text-3xl text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-violet-500  transition duration-300 ease-in-out hover:scale-110"
      >
        SPOTIT
      </Link>
      <AuthLinks />
    </nav>
  );
};

export default Navbar;
