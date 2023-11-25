"use client";

import { useState } from "react";

const ShowAlert = ({
  show,
  message,
  type,
}: {
  show: boolean;
  message: string;
  type: "success" | "error";
}) => {
  if (!show) {
    return <></>;
  } else if (type == "success") {
    return (
      <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-info"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{message}</span>
      </div>
    );
  } else {
    return (
      <div role="alert" className="alert alert-error">
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
    );
  }
};

const FileUploadComponent = ({
  params,
}: {
  params: { caseid: string; userid: string };
}) => {
  const { caseid, userid } = params;
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const url = "/api/pre-signed";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });
    if (response.ok) {
      const { url, fields } = await response.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      
      });
      if (uploadResponse.ok) {
        setUploadSuccess(true);
        setUploadFailed(false);
        const response = await fetch("/api/record-uploaded-file", {
          method: "POST",
          body: JSON.stringify({ filename: file.name, filetype: file.type, caseid:caseid  }),
        });
      } else {
        console.error("S3 Upload Error:", uploadResponse);
        setUploadFailed(true);
        setUploadSuccess(false);
      }
    } else {
      alert("Failed to get pre-signed URL.");
    }

    setUploading(false);
  };

  return (
    <div>
      <ShowAlert
        show={uploadSuccess}
        message={"File Upload Complete"}
        type="success"
      />
      <ShowAlert
        show={uploadFailed}
        message="File upload failed"
        type="error"
      />
      <main className="m-40 flex justify-center">
        <div className="card w-max bg-base-100 shadow-xl">
          <div className="card-body">
            <h1>Upload a File to S3</h1>
            <form onSubmit={handleSubmit}>
              <input
                id="file"
                type="file"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    setFile(files[0]);
                  }
                }}
                className="file-input file-input-bordered"
              />
              <div className="my-8 flex justify-between">
                <a
                  className="btn btn-ghost"
                  href={`/view/${params.userid}/${params.caseid}`}
                >
                  Go back
                </a>
                <button
                  type="submit"
                  disabled={uploading}
                  className="btn btn-neutral"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default FileUploadComponent;
