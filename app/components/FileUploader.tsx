import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return "0 KB";

  const units = ["KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)) - 1, units.length - 1);
  const size = bytes / 1024 ** (index + 1);

  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[index]}`;
};

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
      },
      [onFileSelect]
    ),
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">

          {file ? (
            <div className="uploader-selected-file" onClick={(e)=>e.stopPropagation()}>
              <img src="public/images/pdf.png" alt="pdf" className="size-8 "/>
              <div className="flex items-center space-x-3">
              
              <div>
                <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button className = "p-2 cursor-pointer" onClick={(e) => {onFileSelect?.(null)}}>
              <img src="public/icons/cross.svg" alt="remove" className="w-4 h-4"/>
            </button>
            </div>
            
          ) : (
            <div>
              <div className="h-16 w-16 flex mx-auto items-center justify-center mb-2">
              <img src="public/icons/info.svg" alt="Upload" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to Upload</span> or Drag and Drop
              </p>
              <p className="text-lg text-gray-500">PDF (max 20 MB)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;