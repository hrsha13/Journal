'use client';

import React from 'react';

export default function CurrentIssuePage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        
        <h1 className="text-2xl font-bold mb-4">
          Current Issue
        </h1>

        <p className="text-gray-700 mb-6">
          Download the complete issue as a PDF using the link below.
        </p>

        <div className="border rounded-lg p-4 bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">
            Download
          </h2>

          <a
            href="/pdfs/current-issue.pdf"
            download
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download Complete Issue (PDF)
          </a>
        </div>

      </div>
    </main>
  );
}
