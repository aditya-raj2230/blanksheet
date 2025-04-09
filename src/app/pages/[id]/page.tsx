'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const PageTextViewer = () => {
  const params = useParams();
  const id = params?.id as string;
  const [text, setText] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(`/api/page/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch text: ${response.statusText}`);
        }
        const data = await response.json();
        setText(data.text || "No text found for this page.");
      } catch (err) {
        console.error(err);
        setError("Failed to load text. Please try again later.");
      }
    };

    if (id) {
      fetchText();
    }
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shared Text</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{text}</div>
      )}
    </div>
  );
};

export default PageTextViewer;