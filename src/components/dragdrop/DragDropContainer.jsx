import React, { useState, useRef } from "react";
import "./DragDropContainer.css";

function FileUpload({ isLoading, handleSave, onFileUpload }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    if (onFileUpload) onFileUpload(e);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      <div
        className={`dropzone ${dragging ? "dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        {files.length === 0 ? (
          "Drag & drop files here or click to select"
        ) : (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name}
                <button className="remove-bt" onClick={() => removeFile(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {files.length > 0 && (
        <button className="save-bt" onClick={() => handleSave(files)}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
}

export default FileUpload;
