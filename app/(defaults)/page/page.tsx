"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function PolicyEditor() {
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [termsConditions, setTermsConditions] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');
  const [id, setId] = useState(null); // ← Track existing page ID
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing policy on mount
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await fetch('/api/page');
        const data = await res.json();

        if (data.success && data.data) {
          setPrivacyPolicy(data.data.privacyPolicy || '');
          setTermsConditions(data.data.termsConditions || '');
          setRefundPolicy(data.data.refundPolicy || '');
          setId(data.data._id); // Save the MongoDB document ID
        }
      } catch (error) {
        console.error("Failed to fetch policy:", error);
      }
    };

    fetchPolicy();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      privacyPolicy,
      termsConditions,
      refundPolicy,
    };

    try {
      const res = await fetch(`/api/page${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to submit');
      alert('Policy saved successfully!');
    } catch (error) {
      alert('Submission failed.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Policy Editor</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '2rem' }}>
          <label><strong>Privacy Policy</strong></label>
          <ReactQuill value={privacyPolicy} onChange={setPrivacyPolicy} />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label><strong>Terms & Conditions</strong></label>
          <ReactQuill value={termsConditions} onChange={setTermsConditions} />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label><strong>Refund Policy</strong></label>
          <ReactQuill value={refundPolicy} onChange={setRefundPolicy} />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
