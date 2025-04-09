'use client';
import { nanoid } from 'nanoid';
import React, { FC, useEffect, useState } from 'react';

const TextArea: FC = () => {
  const [text, setText] = useState<string>(''); // Text content
  const [id, setId] = useState<string>(''); // Unique ID for the page
  const [isSaving, setIsSaving] = useState<boolean>(false); // To track saving state

  useEffect(() => {
    // Generate a new unique ID on every refresh
    const newId = nanoid(8);
    setId(newId);
    localStorage.setItem('current-id', newId); // Store the new ID in localStorage
  }, []);

  const saveToDatabase = async () => {
    if (id) {
      setIsSaving(true); // Set saving state to true
      try {
        const response = await fetch(`/api/page/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }), // Save the current text
        });
        if (!response.ok) {
          throw new Error('Failed to save text');
        }
        alert('Text saved successfully!');
      } catch (err) {
        console.error('Failed to save text:', err);
        alert('Failed to save text. Please try again.');
      } finally {
        setIsSaving(false); // Reset saving state
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-200 shadow-2xl rounded-xl p-6">
      {/* Text Area */}
      <textarea
        className="w-full h-full flex-grow p-6 bg-white border border-gray-300 rounded-lg shadow-inner resize-none focus:outline-none focus:ring-4 focus:ring-blue-400 text-gray-800 text-lg placeholder-gray-400"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        placeholder="Start writing your thoughts here..."
      />

      {/* Save Button */}
      <button
        className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={saveToDatabase}
        disabled={isSaving} // Disable button while saving
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default TextArea;