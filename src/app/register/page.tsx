"use client";
import { useState } from "react";

const Page = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [userCreation, setUserCreation] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [email, password, repeat_password, first_name, last_name] =
      e.currentTarget.elements;
    const [
      emailInput,
      passwordInput,
      repeatPasswordInput,
      firstNameInput,
      lastNameInput,
    ] = [
      email as HTMLInputElement,
      password as HTMLInputElement,
      repeat_password as HTMLInputElement,
      first_name as HTMLInputElement,
      last_name as HTMLInputElement,
    ];
    if (passwordInput.value !== repeatPasswordInput.value) {
      passwordInput.classList.add("border-red-500");
      repeatPasswordInput.classList.add("border-red-500");
      setMessage("Passwords do not match");
      setError(true);
      return;
    } else {
      setError(false);
      setMessage("");
      passwordInput.classList.remove("border-red-500");
      repeatPasswordInput.classList.remove("border-red-500");
      const loadingButton = document.getElementById("loading-button");
      loadingButton?.classList.remove("hidden");
      const submitButton = document.getElementById("submit-button");
      submitButton?.classList.add("hidden");
    }
    const response = await fetch("/api/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
      }),
    });
    const { status, message } = await response.json();
    if (status === "success") {
      setMessage(message);
      setUserCreation(true);
    }
  };
  return (
    <div>
      <div
        role="alert"
        className={"alert alert-success" + `${userCreation ? "" : " hidden"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
      <div
        role="alert"
        className={"alert alert-error" + `${error ? "" : " hidden"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="min-w-2xl card max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="card-title">Regsiter your account</div>
            <form
              className="mx-auto max-w-md"
              onSubmit={handleSubmit}
              method="POST"
              action="/api/register-user"
            >
              <div className="group relative z-0 mb-5 w-full">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Email address
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Password
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input
                  type="password"
                  name="repeat_password"
                  id="floating_repeat_password"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_repeat_password"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  Confirm password
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="group relative z-0 mb-5 w-full">
                  <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                  >
                    First name
                  </label>
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <input
                    type="text"
                    name="floating_last_name"
                    id="floating_last_name"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                  >
                    Last name
                  </label>
                </div>
              </div>

              <button type="submit" id="submit-button" className="btn btn-info">
                Submit
              </button>
              <button
                type="submit"
                id="loading-button"
                className="btn btn-info hidden"
                disabled
              >
                <span className="loading loading-spinner loading-xs"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
