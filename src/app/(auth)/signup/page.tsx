"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  // 🔐 Kalau sudah login, redirect ke home
  useEffect(() => {
    const token = Cookies.get("token") || localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, [router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/api/auth/create-account", {
        name,
        username,
        email,
        password,
      password_confirmation: passwordConfirmation,
      });

      const { access_token, user } = res.data;

      // Simpan token & user
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      Cookies.set("token", access_token, { expires: 7 });

      // Redirect ke home
      router.push("/");
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      console.error(axiosError);

      setError(
        axiosError.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Ilustrasi kiri */}
      <div className="lg:block hidden">
        <Image
          src="/images/register.svg"
          alt="Register Illustration"
          className="h-screen w-full object-cover"
          width={1200}
          height={1200}
          priority
        />
      </div>

      {/* Form kanan */}
      <div className="flex flex-col justify-center xl:mx-[125px] lg:mt-0 mt-[100px] sm:mx-[100px] mx-5">
        <div className="text-center mb-6">
          <h1 className="text-[40px] font-bold text-mainColor">Create an Account</h1>
          <h2 className="sm:text-[40px] text-[32px] font-bold">
            Fill in the Form Correctly
          </h2>
        </div>

        {error && (
          <p className="text-red-500 bg-red-100 p-4 rounded-md text-center font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col mt-11 gap-4">
          <div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
            <input
              type="text"
              className="input-text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Name"
              autoComplete="name"
            />
            <input
              type="text"
              className="input-text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
              autoComplete="username"
            />
          </div>
          <input
            type="email"
            className="input-text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            autoComplete="email"
          />
          <input
            type="password"
            className="input-text"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
            minLength={6}
          />
          <input
            type="password"
            className="input-text"
            placeholder="Enter your password confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            aria-label="Password Confirmation"
            minLength={6}
          />

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-[#272B2C]/50 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-mainColor">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}