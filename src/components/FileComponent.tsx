import { File } from "@prisma/client";
import {
  BsFileEarmarkWordFill,
  BsFileRuledFill,
  BsFiletypePdf,
  BsFiletypeTxt,
  BsFiles,
} from "react-icons/bs";

const FileTypeMap = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": (
    <BsFileEarmarkWordFill />
  ),
  "text/plain": <BsFiletypeTxt />,
  "application/spreadsheet": <BsFileRuledFill />,
  "application/pdf": <BsFiletypePdf />,
};

export const FileComponent = ({ files }: { files: File[] | null }) => {
  if (!files || files.length < 1) return <div>There are no files</div>;
  else {
    return (
      <div>
        {files.map((file) => {
          return (
            <div className="flex justify-start">
              <div className="mx-2">
                {FileTypeMap[file.filetype] == undefined ? (
                  <BsFiles />
                ) : (
                  FileTypeMap[file.filetype]
                )}{" "}
              </div>{" "}
              <div>Name: {file.url}</div>
            </div>
          );
        })}
      </div>
    );
  }
};
