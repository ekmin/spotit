"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  function AuthLinks() {
    const { data: session } = useSession();

    if (session) {
      return (
        <div className="flex items-center space-x-5 w-full order-3 justify-between mt-5 sm:flex sm:items-center sm:space-x-5 sm:w-auto sm:order-none sm:justify-start sm:mt-0">
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
          <Link
            href="/saved"
            className="text-secondary-color font-semibold hover:text-secondary-dark-color transition duration-300 ease-in-out hover:scale-110"
          >
            Saved
          </Link>
        </div>
      );
    }
  }

  const AuthButton = () => {
    const { data: session } = useSession();

    if (session) {
      return (
        <button
          className="bg-secondary-color hover:bg-secondary-dark-color hover:rotate-6 transition duration-300 ease-in-out md:w-28 md:h-10 md:text-sm rounded-lg text-xs text-primary-color w-20 h-8"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
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
  };

  return (
    <nav className="flex items-center justify-between px-4 py-4 mb-8 border-b font-medium shadow-sm 2xl:px-8 flex-wrap">
      <Link
        href="/"
      >
        <div className="flex gap-3 items-center md:text-3xl text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-secondary-dark-color to-secondary-color  transition duration-300 ease-in-out hover:scale-110">
        <Image
          src="/logo.png"
          alt="Logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "40px", height: "auto" }}
          priority
        />
        SPOTIT
        </div>
      </Link>
      <AuthLinks />
      <AuthButton />
    </nav>
  );
};

export default Navbar;
