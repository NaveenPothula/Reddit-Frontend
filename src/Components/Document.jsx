import React, { useState } from "react";
import axios from "axios";

const FileUploader = () => {
  const [file, setFile] = useState(null);

  // Handle file input change
  const handleFileChange = async (event) => {
    console.log("requested");
    // const selectedFile = event.target.files[0];
    // if (selectedFile) {
    //   setFile(selectedFile);
    // }
    // const formData = new FormData();
    // formData.append("file", file);
    // try {
    //   const response = await axios.post(
    //     "http://localhost:4000/api/analyze",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data", // Ensure correct content type
    //       },
    //       withCredentials: true, // Include credentials (cookies) in the request
    //     }
    //   );

    //   const data = await response.json();
    //   console.log("Analyzed Result:", data);
    // } catch (e) {
    //   console.log(e.response);
    // }
  };

  // Handle file delete
  const handleDeleteFile = () => {
    setFile(null); // Clear the file
    document.getElementById("file-upload").value = ""; // Reset input value
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload a File</h1>

      {/* Custom file input with hidden default */}
      <div className="flex items-center space-x-4 mb-4">
        <label className="block">
          <span className="sr-only">Choose file</span>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Choose File
          </label>
        </label>
      </div>

      {/* Display file name and delete button in the same row */}
      {file && (
        <div className="flex items-center space-x-4 mt-4">
          <p className="text-gray-700">
            Uploaded File: <span className="font-semibold">{file.name}</span>
          </p>
          <button
            onClick={handleDeleteFile}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
