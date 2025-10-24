"use client";
import React, { useState } from "react";

/**
 * Minimal, reusable Lost/Found form.
 * Props:
 *  - onAdd(item) : callback when new item reported
 */
export default function LostFoundForm({ onAdd }) {
  const [type, setType] = useState("lost"); // lost | found
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [when, setWhen] = useState("");
  const [place, setPlace] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [fileData, setFileData] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return setFileData(null);
    const reader = new FileReader();
    reader.onload = () => setFileData(reader.result);
    reader.readAsDataURL(f);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setWhen("");
    setPlace("");
    setContactName("");
    setContactPhone("");
    setFileData(null);
    setType("lost");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: `lf_${Date.now()}`,
      type,
      title: title || (type === "lost" ? "Lost item" : "Found item"),
      description,
      when,
      place,
      contactName,
      contactPhone,
      image: fileData || "/keys.png",
      createdAt: new Date().toISOString(),
      resolved: false,
    };
    onAdd(item);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/6 p-4 rounded-md shadow-md">
      <div className="flex gap-2 mb-4">
        <label className={`px-3 py-2 rounded-md cursor-pointer ${type === "lost" ? "bg-red-600 text-white" : "bg-white/5 text-white"}`}>
          <input className="sr-only" type="radio" name="type" value="lost" checked={type === "lost"} onChange={() => setType("lost")} />
          Report Lost
        </label>
        <label className={`px-3 py-2 rounded-md cursor-pointer ${type === "found" ? "bg-green-600 text-white" : "bg-white/5 text-white"}`}>
          <input className="sr-only" type="radio" name="type" value="found" checked={type === "found"} onChange={() => setType("found")} />
          Report Found
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short title (e.g. Keys, Wallet)" className="p-2 rounded bg-white/5" />
        <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="When (e.g. 2025-05-01 10:30)" className="p-2 rounded bg-white/5" />
        <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Where (e.g. Library, Block A)" className="p-2 rounded bg-white/5" />
        <input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Contact name" className="p-2 rounded bg-white/5" />
        <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Contact phone" className="p-2 rounded bg-white/5" />
        <input type="file" accept="image/*" onChange={handleFile} className="p-2 rounded bg-white/5" />
      </div>

      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description / notes" className="w-full mt-3 p-2 rounded bg-white/5" rows={3} />

      {fileData && (
        <div className="mt-3">
          <img src={fileData} alt="preview" className="w-32 h-32 object-cover rounded" />
        </div>
      )}

      <div className="flex gap-3 justify-end mt-4">
        <button type="button" onClick={reset} className="px-4 py-2 bg-white/5 rounded">Clear</button>
        <button type="submit" className={`px-4 py-2 rounded ${type === "lost" ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}>Submit</button>
      </div>
    </form>
  );
}
