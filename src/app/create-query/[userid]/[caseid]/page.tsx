"use client";

import React from "react";

const CreateQuery = ({
  params,
}: {
  params: { userid: string; caseid: string };
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const button = document.getElementById("submitButton");
    button?.classList.add("hidden");
    button?.setAttribute("disabled", "");
    const loadingButton = document.getElementById("loadingButton");
    loadingButton?.classList.remove("hidden");
    const form = document.getElementById("create-case") as HTMLFormElement;

    form.submit();
  };
  return (
    <div className="mx-auto mt-8 max-w-md rounded-md bg-white p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Add a query </h2>
      <form
        method="POST"
        id="create-case"
        onSubmit={handleSubmit}
        action={`/api/add-query`}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Query
          </label>
          <input
            type="input"
            name="content"
            id="content"
            placeholder="Enter your query"
            className="mt-1 w-full rounded-md border p-2"
            required
          />
        </div>

        <input
          type="input"
          name="caseid"
          defaultValue={params.caseid}
          className="hidden"
        />
        <input
          type="input"
          name="userid"
          defaultValue={params.userid}
          className="hidden"
        />
        <div className="mx-auto max-w-md rounded-md bg-white text-center">
          <button
            type="submit"
            id="submitButton"
            className="btn btn-info rounded-md bg-gray-300 px-4 py-2 text-black transition duration-300 ease-in-out hover:bg-gray-400 focus:border-gray-300 focus:outline-none focus:ring"
          >
            Add a query
          </button>
        </div>
        <button className="btn hidden" id="loadingButton">
          <span className="loading loading-spinner"></span>
          Loading
        </button>
      </form>
    </div>
  );
};
export default CreateQuery;
