import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import {
  FiUploadCloud,
  FiFile,
  FiCheckCircle,
  FiX,
  FiArrowRight,
} from 'react-icons/fi'

/* ---------------- Helpers ---------------- */

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

const generateId = () => Math.random().toString(36).substr(2, 9)

/* ---------------- Component ---------------- */

export default function Upload() {
  const navigate = useNavigate()

  const [files, setFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState({})
  const [uploadStatus, setUploadStatus] = useState('idle')

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: generateId(),
      name: file.name,
      size: file.size,
      preview: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : null,
      status: 'pending',
      result: null,
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10485760,
    multiple: true,
  })

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const clearAll = () => {
    setFiles([])
    setUploadProgress({})
    setUploadStatus('idle')
  }

  /* ---------------- REAL BACKEND UPLOAD ---------------- */

  const handleSubmit = async () => {
    if (files.length === 0) return

    setUploadStatus('uploading')

    try {
      for (const fileObj of files) {
        const formData = new FormData()
        formData.append('document', fileObj.file)

        const response = await api.post(
          '/documents/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )

              setUploadProgress((prev) => ({
                ...prev,
                [fileObj.id]: percent,
              }))
            },
          }
        )

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileObj.id
              ? {
                  ...f,
                  status: 'success',
                  result: response.data,
                }
              : f
          )
        )
      }

      setUploadStatus('success')
    } catch (error) {
      console.error(error)
      setUploadStatus('error')
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Upload Documents
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Submit files for AI forgery detection.
          </p>
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
            isDragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-slate-200 bg-white hover:border-blue-300'
          }`}
        >
          <input {...getInputProps()} />
          <FiUploadCloud className="mx-auto w-8 h-8 text-slate-400" />
          <p className="mt-3 text-sm text-slate-600">
            Drag files here or click to browse
          </p>
          <p className="text-xs text-slate-400 mt-1">
            PDF, PNG, JPG (Max 10MB)
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between px-6 py-4 border-b last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiFile className="text-slate-400" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatFileSize(file.size)}
                    </p>

                    {file.result && (
                      <div className="mt-2 text-xs">
                        <span
                          className={
                            file.result.status === 'FAKE'
                              ? 'text-red-500'
                              : 'text-emerald-500'
                          }
                        >
                          {file.result.status}
                        </span>
                        <span className="text-slate-400 ml-2">
                          ({file.result.confidence}% confidence)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {uploadProgress[file.id] && uploadProgress[file.id] < 100 && (
                    <div className="w-24 bg-slate-100 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all"
                        style={{
                          width: `${uploadProgress[file.id]}%`,
                        }}
                      />
                    </div>
                  )}

                  {file.status === 'success' && (
                    <FiCheckCircle className="text-emerald-500" />
                  )}

                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        {files.length > 0 && uploadStatus !== 'uploading' && (
          <button
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition"
          >
            Upload Files
          </button>
        )}

        {/* Success Modal */}
        {uploadStatus === 'success' && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <FiCheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">
                Upload Complete
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Documents processed successfully.
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={clearAll}
                  className="px-4 py-2 border rounded-lg"
                >
                  Upload More
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-1"
                >
                  Dashboard <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}