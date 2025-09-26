"use client";

import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import Swal from "sweetalert2";
import IconLockDots from "@/components/icon/icon-lock-dots";
import IconMail from "@/components/icon/icon-mail";

const ComponentsAuthLoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete your account? After that, all your information will be removed from our database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("/api/delete-account", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire(
            "Deleted!",
            "Your account has been deleted successfully.",
            "success"
          );
          // Clear local storage and redirect
          localStorage.removeItem("auth");
          router.push("/login"); // Redirect to goodbye or home page
        } else {
          Swal.fire("Error!", data.message, "error");
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-lg">
        <div className="mb-4 mt-2 flex justify-center">
          <img src="/assets/images/logo.jpg" alt="Logo" className="h-20" />
        </div>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Delete your account
        </h2>
        <form className="space-y-5" onSubmit={submitForm}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                className="form-input block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IconMail fill={true} />
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                className="form-input block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IconLockDots fill={true} />
              </span>
            </div>
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <button
            type="submit"
            className="btn btn-gradient mt-6 w-full rounded-md border-0 bg-gradient-to-r from-purple-500 to-pink-500 py-2 font-bold uppercase text-white shadow-lg"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComponentsAuthLoginForm;
