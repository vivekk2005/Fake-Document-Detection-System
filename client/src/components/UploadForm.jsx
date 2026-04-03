import React from 'react'

export default function UploadForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Document Image (JPG, PNG only)</label>
        <input type="file" accept=".jpg,.jpeg,.png" className="mt-1 block w-full" />
      </div>
      <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md">Upload</button>
    </form>
  )
}

