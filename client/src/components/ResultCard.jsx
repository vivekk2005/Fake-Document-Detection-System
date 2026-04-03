import React from 'react'

export default function ResultCard({ title, score, className }) {
  return (
    <div className={`p-4 border rounded-md bg-white ${className || ''}`}>
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-600">Confidence: <span className="font-medium">{score}</span></div>
    </div>
  )
}
