import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Converter() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isUrlSelected, setIsUrlSelected] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null); // Added state for download URL

  const isValidInput = () => url.trim() !== "" || file !== null;

  const handleConvert = async () => {
    if (!isValidInput()) return;

    setIsConverting(true);
    setProgress(0);
    setError("");
    setDownloadUrl(null); // Reset download URL

    const formData = new FormData();
    if (isUrlSelected) {
      formData.append("url", url);
    } else {
      formData.append("file", file);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/convert/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Conversion failed");
      }

      // Get the blob directly from response
      const blob = await response.blob();
      const newDownloadUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(newDownloadUrl); // Store download URL in state

      // Auto-start download
      const a = document.createElement("a");
      a.href = newDownloadUrl;
      a.download = `converted_${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(newDownloadUrl);
      document.body.removeChild(a);

      setProgress(100);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileUpload = (file) => {
    const validTypes = [
      "video/mp4",
      "video/quicktime",
      "video/webm",
      "video/x-msvideo",
    ];
    const maxSize = 500 * 1024 * 1024;

    setError("");

    if (!validTypes.some((type) => file.type.includes(type))) {
      setError("Invalid file type - we support MP4, MOV, AVI, and WEBM");
      return;
    }

    if (file.size > maxSize) {
      setError("File size exceeds 500MB limit");
      return;
    }

    setFile(file);
  };

  useEffect(() => {
    return () => {
      // Cleanup any remaining object URLs
      if (downloadUrl) {
        window.URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]); // Added dependency

  return (
    <div className="max-w-2xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => {
              setIsUrlSelected(true);
              setFile(null);
            }}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              isUrlSelected
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Paste URL
          </button>
          <button
            onClick={() => {
              setIsUrlSelected(false);
              setUrl("");
            }}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              !isUrlSelected
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Upload File
          </button>
        </div>

        {isUrlSelected ? (
          <input
            type="text"
            placeholder="Paste YouTube or video URL here"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        ) : (
          <div
            className="border-2 border-dashed p-8 text-center rounded-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileUpload(e.dataTransfer.files[0]);
            }}
          >
            {file ? (
              <p className="text-gray-600 truncate">{file.name}</p>
            ) : (
              <>
                <p className="text-gray-600">
                  Drop video file here or click to upload
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  accept="video/*"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer block mt-2 text-blue-600 hover:text-blue-800"
                >
                  Browse Files
                </label>
              </>
            )}
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-100 text-red-700 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={handleConvert}
            disabled={!isValidInput() || isConverting}
            className={`w-full py-3 px-6 rounded font-semibold transition-all ${
              isConverting
                ? "bg-gray-400 cursor-not-allowed"
                : isValidInput()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white`}
            whileTap={{ scale: 0.95 }}
          >
            {isConverting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Downloading...
              </span>
            ) : (
              "Download Now"
            )}
          </motion.button>
        </motion.div>

        {isConverting && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <motion.div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
