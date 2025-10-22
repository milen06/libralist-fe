"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
      const res = await api.post("/api/auth/login", { email, password });
      const { access_token, user } = res.data;

      // Simpan token dan user ke localStorage
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
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* kiri */}
      <div className="lg:block hidden">
        <Image
          src="/images/login.svg"
          alt="Login Illustration"
          className="h-screen w-full object-cover"
          width={1200}
          height={1200}
          priority
        />
      </div>

      {/* kanan */}
      <div className="flex flex-col justify-center xl:mx-[125px] lg:mt-0 mt-[100px] sm:mx-[100px] mx-5">
        <div className="text-center mb-6">
          <h1 className="text-[40px] font-bold text-mainColor">Welcome Back</h1>
          <h2 className="sm:text-[40px] text-[32px] font-bold">
            Please Login Your Account
          </h2>
        </div>

        {error && (
          <p className="text-red-500 bg-red-100 p-4 rounded-md text-center font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col mt-11 gap-4">
          <input
            type="email"
            className="input-text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-text"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-[#272B2C]/50 text-center">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-mainColor">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}