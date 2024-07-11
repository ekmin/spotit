"use client"

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  function AuthButton() {
    const { data: session } = useSession();

    if (session) {
      return (
        <button
          className="bg-primary-color hover:bg-primary-dark-color hover:rotate-12 transition duration-300 ease-in-out md:w-28 md:h-10 md:text-sm rounded-lg text-xs w-20 h-8"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      );
    }
    return (
      <button
      className="bg-primary-color hover:bg-primary-dark-color hover:rotate-12 transition duration-300 ease-in-out md:w-28 md:h-10 md:text-sm rounded-lg text-xs w-20 h-8"
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
      <AuthButton />
    </nav>
  );
};

export default Navbar;
