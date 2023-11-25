"use client";
import { useState } from "react";
import axios from "axios";

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      const emailData = {
        to: "bhuvaneswari728@gmail.com",
        from: email,
        message: message,
      };
      const response = await axios.post("/api/mailgun/", emailData);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 flex flex-col items-center">
      <h1 className="text-gray mb-6 text-5xl">Contact Us</h1>
      <p className="mb-6 text-xl text-gray-700">Contact us through email</p>
      <div className="mb-6 w-full max-w-md">
        <input
          type="email"
          placeholder="Your Email"
          className="w-full rounded border border-gray-300 p-4 text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6 w-full max-w-md">
        <textarea
          placeholder="Message"
          className="w-full resize-none rounded border border-gray-300 p-4 text-lg"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="focus:shadow-outline-primary mr-4 rounded-md bg-gray-300 p-2 text-black transition duration-300 ease-in-out hover:bg-gray-400 focus:outline-none"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
