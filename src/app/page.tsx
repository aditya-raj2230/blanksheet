'use client';
import Navbar from "@/components/Navbar";
import TextArea from "@/components/TextArea";

import { useState, useEffect } from "react";

export default function Home() {
  const [button, setButton] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [isCopying,setIsCopying]= useState<boolean>(false);

  useEffect(() => {
    // Fetch the latest ID from localStorage
    const existingId = localStorage.getItem("current-id");
    if (existingId) {
      setId(existingId);
    } else {
      const newId = crypto.randomUUID(); // Generate a new unique ID
      localStorage.setItem("current-id", newId);
      setId(newId);
    }
  }, []);

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Navbar button={button} setButton={setButton} />
      <div className="container mx-auto px-4 py-8 h-4/5">
        <TextArea />
      </div>
      {button && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
              onClick={() => setButton(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">API Link</h2>
            <p className="text-blue-600 font-medium underline break-all">
              {id ? `http://localhost:3000/pages/${id}` : "Loading..."}
         </p>
         {id && (
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center relative">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        onClick={() => setButton(false)}
      >
        ✖
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">API Link</h2>
      <p className="text-blue-600 font-medium underline break-all mb-6">
        {`http://localhost:3000/pages/${id}`}
      </p>
      <button
        className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition ${
          isCopying ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={async () => {
          if (!isCopying) {
            setIsCopying(true);
            await navigator.clipboard.writeText(`http://localhost:3000/pages/${id}`);
            setTimeout(() => setIsCopying(false), 2000); // Disable for 2 seconds
          }
        }}
        disabled={isCopying}
      >
        {isCopying ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  </div>
)}
          </div>
        </div>
      )}
    </div>
  );
}