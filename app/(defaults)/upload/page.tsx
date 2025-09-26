// app/(defaults)/upload.page.tsx
"use client";
import { useState } from 'react';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadedUrl(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await res.json();
      setUploadedUrl(data.url);
    } catch (error: any) {
      setError(error.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {uploadedUrl && (
        <p>
          File uploaded successfully!{' '}
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </p>
      )}
    </div>
  );
};

export default UploadPage;
