"use client";

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import compressFile from "@/actions/compressFile";
import { FaTimes } from "react-icons/fa";

interface FileProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  disabled?: boolean;
  multiple?: boolean;
}

const File = ({ files, setFiles, disabled, multiple }: FileProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    const currentFilesNameArr = files.map((file) => file.name);
    try {
      if (inputFiles && inputFiles.length > 0) {
        setLoading(true);
        const compressedFiles = [];

        for (let i = 0; i < inputFiles.length; i++) {
          if (!currentFilesNameArr.includes(inputFiles[i].name)) {
            const compressedFile = await compressFile(inputFiles[i]);
            compressedFiles.push(compressedFile);
          }
        }

        setFiles([...files, ...compressedFiles]);
        setLoading(false);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      console.log("file handle error");
    }
  };

  const handleDelete = (index: number) => {
    const deletedFiles = files.filter((__, fileIndex) => fileIndex !== index);
    setFiles(deletedFiles);
  };

  const onClick = useCallback(() => {
    if (disabled) {
      return;
    }
    ref.current?.click();
  }, [disabled]);

  return (
    <div>
      <span
        onClick={onClick}
        className={`border text-zinc-400 p-4 rounded-md cursor-pointer hover:opacity-70 transition ${
          (loading || disabled) && "animate-pulse bg-zinc-200"
        } `}
      >
        {loading ? "압축중.." : "사진선택"}
      </span>
      <input
        hidden
        type="file"
        ref={ref}
        onChange={handleFile}
        disabled={disabled}
        multiple={multiple}
      />
      <div className="flex flex-wrap gap-2 pt-6">
        {files.map((file, index) => (
          <div
            key={file.name}
            className="flex items-center gap-4 bg-zinc-100 px-2 py-1 rounded"
          >
            <span>{file.name}</span>
            <FaTimes
              onClick={() => handleDelete(index)}
              size={14}
              className="text-rose-500 cursor-pointer hover:opacity-70 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default File;
