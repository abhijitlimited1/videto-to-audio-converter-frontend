import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Converter() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isUrlSelected, setIsUrlSelected] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const isValidInput = () => url.trim() !== "" || file !== null;

  const handleConvert = async () => {
    if (!isValidInput()) return;

    setIsConverting(true);
    setProgress(0);
    setError("");
    setDownloadUrl(null);

    const formData = new FormData();
    if (isUrlSelected) {
      formData.append("url", url);
    } else {
      formData.append("file", file);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000);

      const response = await fetch(
        "https://video-to-audio-converter-backend.onrender.com/api/convert/",
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || "Conversion failed");
        } catch {
          throw new Error(errorText || "Conversion failed");
        }
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error("Empty response from server");
      }

      const newDownloadUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(newDownloadUrl);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = newDownloadUrl;
      a.download = `converted_${Date.now()}.mp3`;

      if (typeof a.download === "undefined") {
        a.target = "_blank";
      }

      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(newDownloadUrl);
        document.body.removeChild(a);
      }, 1000);

      setProgress(100);
    } catch (error) {
      setError(
        error.message.includes("aborted")
          ? "Request timed out - try smaller files or different URL"
          : error.message
      );
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
      "video/mpeg",
    ];
    const validExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
    const maxSize = 500 * 1024 * 1024;

    setError("");

    const isValidType = validTypes.some((type) => file.type.includes(type));
    const isValidExtension = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!isValidType || !isValidExtension) {
      setError("Unsupported file format - we accept MP4, MOV, AVI, MKV, WEBM");
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
      if (downloadUrl) {
        window.URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

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
          <>
            <p className="text-sm text-gray-500 mb-2">
              🔔 Free service: URL conversion may fail during peak hours
            </p>
            <input
              type="text"
              placeholder="Paste YouTube or video URL here"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </>
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
                  capture="environment"
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
            <div className="font-bold">{error}</div>
            {error.includes("limit reached") && (
              <div className="mt-2">
                🛠️ Workaround:
                <button
                  onClick={() => setIsUrlSelected(false)}
                  className="ml-2 text-blue-600 underline"
                >
                  Upload File Instead
                </button>
              </div>
            )}
            {error.includes("verification") && (
              <div className="mt-2">
                🔍 Try downloading the video first and then uploading it here
              </div>
            )}
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
