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
          const errorMessage = errorData.error.toLowerCase();

          let userMessage = errorData.error;
          if (errorData.solution) userMessage += ` - ${errorData.solution}`;

          if (
            errorMessage.includes("url") ||
            errorMessage.includes("youtube")
          ) {
            userMessage += " Try uploading the file directly instead.";
          }

          throw new Error(userMessage);
        } catch {
          throw new Error(
            errorText || "Conversion failed. Try uploading the file directly."
          );
        }
      }

      const blob = await response.blob();

      if (blob.size === 0 || !blob.type.includes("audio/mpeg")) {
        throw new Error("Invalid audio file - conversion failed");
      }

      const newDownloadUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(newDownloadUrl);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = newDownloadUrl;
      a.download = `audio_${Date.now()}.mp3`;

      if (typeof a.download === "undefined") {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(newDownloadUrl);
        document.body.removeChild(a);
      }, 3000);

      setProgress(100);
    } catch (error) {
      const errorMessage = error.message.includes("aborted")
        ? "Request timed out - try smaller files or different URL"
        : error.message.includes("network")
        ? "Network error - check your internet connection"
        : error.message;

      setError(
        `${errorMessage} ${
          isUrlSelected ? "Try uploading the file instead." : ""
        }`
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
    const maxSize = 500 * 1024 * 1024;

    setError("");

    if (!file.type.startsWith("video/")) {
      setError("Invalid file type - please upload video files");
      return;
    }

    if (!validTypes.includes(file.type)) {
      setError("Unsupported format: MP4, MOV, AVI, MKV, WEBM only");
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
            onClick={() => setIsUrlSelected(true)}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              isUrlSelected
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Paste URL
          </button>
          <button
            onClick={() => setIsUrlSelected(false)}
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
              🔔 For best results, we recommend uploading files directly
            </p>
            <input
              type="url"
              placeholder="Paste video URL here"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              inputMode="url"
            />
          </>
        ) : (
          <div
            className="border-2 border-dashed p-8 text-center rounded-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = e.dataTransfer.files;
              if (files[0]) handleFileUpload(files[0]);
            }}
          >
            {file ? (
              <p className="text-gray-600 truncate">{file.name}</p>
            ) : (
              <>
                <p className="text-gray-600">
                  Drop video file or click to upload
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files?.[0] && handleFileUpload(e.target.files[0])
                  }
                  accept="video/*"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer block mt-2 text-blue-600 hover:text-blue-800"
                >
                  Select File
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
            {error.includes("Try uploading") && (
              <button
                onClick={() => setIsUrlSelected(false)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Switch to File Upload
              </button>
            )}
          </motion.div>
        )}

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
        >
          {isConverting ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Processing...
            </span>
          ) : (
            "Convert Now"
          )}
        </motion.button>

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
