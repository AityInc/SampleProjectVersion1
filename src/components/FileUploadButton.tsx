// FileUploadButton.tsx
import React, { ChangeEvent } from "react";

interface FileUploadButtonProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileUpload: () => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileChange,
  onFileUpload,
}) => {
  return (
    <div>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <button>Choose File</button>
      </label>
      <button onClick={onFileUpload}>Upload File</button>
    </div>
  );
};

export default FileUploadButton;
