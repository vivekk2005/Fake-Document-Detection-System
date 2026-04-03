import React from 'react'
import UploadForm from '../components/UploadForm'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome back</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Quick upload</h2>
        <UploadForm />
      </div>
    </div>
  )
}
