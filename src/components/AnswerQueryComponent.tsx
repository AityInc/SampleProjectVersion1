"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { BsFillSendFill } from "react-icons/bs";


export const AnswerQueryComponent = ({
  queryid,
  userid,
}: {
  queryid: string;
  userid: string;
}) => {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const userText = e.target.value;
    if (userText.length > 0) {
      setUserInput(userText);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingButton = document.getElementById("loading-button");
    loadingButton?.classList.remove("hidden");
    const submitButton = document.getElementById("submit-button");
    submitButton?.classList.add("hidden");
    e.currentTarget.submit();
  };

  return (
    <form
      id="add-response"
      action="/api/add-response"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <input
          type="text"
          name="queryid"
          className="hidden"
          defaultValue={queryid}
        />
        <input
          type="text"
          name="userid"
          className="hidden"
          defaultValue={userid}
        />
        <textarea
          rows={2}
          name="responsetext"
          id="response-text-area"
          className="input min-w-full"
          onChange={(e) => handleChange(e)}
        />
        <button
          className="btn btn-sm absolute right-1 top-2"
          id="submit-button"
          type="submit"
        >
          <BsFillSendFill />
        </button>
        <button
          className="btn btn-sm absolute right-1 top-2 hidden"
          id="loading-button"
          disabled
        >
          <span className="loading loading-spinner loading-xs"></span>
        </button>
      </div>
    </form>
  );
};
