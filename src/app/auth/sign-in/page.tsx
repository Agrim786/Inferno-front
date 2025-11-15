"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SignInPage = () => {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-white px-4 bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('/background7.jpg')",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Container */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center shadow-2xl">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
          Welcome back!
        </h1>

        {/* Google Login */}
        <button className="flex items-center justify-center w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl py-3 text-sm font-medium transition-all">
          <FcGoogle className="mr-2 text-lg" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center w-full my-6 text-white/50">
          <div className="h-px w-1/3 bg-white/20"></div>
          <span className="mx-2 text-xs">OR</span>
          <div className="h-px w-1/3 bg-white/20"></div>
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email to continue..."
          className="w-full bg-transparent border border-white/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-tertiary mb-4"
        />

        {/* Continue Button */}
        <button className="w-full bg-white/10 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
          Continue <ArrowRight className="h-4 w-4" />
        </button>

        {/* Footer */}
        <p className="text-sm text-white/70 mt-4">
          Don't have an account yet?{" "}
          <a
            href="/auth/sign-up"
            className="underline text-tertiary hover:text-tertiary/80"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
};

export default SignInPage;
