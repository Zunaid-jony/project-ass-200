import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const IMGBB_KEY = "f7befe55c5b2f87dcc5dd9bd8401c88a";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [u, setU] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Firebase Auth fields
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // ✅ Extra fields (Firestore না লাগিয়ে LocalStorage এ রাখলাম যাতে error না হয়)
  const [extra, setExtra] = useState({
    position: "",
    phone: "",
    company: "",
    bio: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMsg = () => {
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setU(user);
      setLoading(false);

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");

      // load extra from localStorage
      const saved = localStorage.getItem(`profile_extra_${user.uid}`);
      if (saved) {
        try {
          setExtra(JSON.parse(saved));
        } catch {}
      }
    });

    return () => unsub();
  }, [navigate]);

  const uploadToImgBB = async (file) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (!data?.success) throw new Error("upload failed");
    return data.data.url;
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    resetMsg();

    if (!file.type.startsWith("image/")) {
      setError("শুধু image file select করো");
      return;
    }

    const maxMB = 2;
    if (file.size > maxMB * 1024 * 1024) {
      setError(`Image size ${maxMB}MB এর কম হতে হবে`);
      return;
    }

    try {
      setUploading(true);
      const url = await uploadToImgBB(file);
      setPhotoURL(url);
      setSuccess("Image uploaded ✅ এখন Save Changes দাও");
    } catch (err) {
      console.log(err);
      setError("Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    resetMsg();

    if (!u) return;
    if (!name.trim()) {
      setError("Name খালি রাখা যাবে না");
      return;
    }

    try {
      setSaving(true);

      // update auth profile
      await updateProfile(u, {
        displayName: name.trim(),
        photoURL: photoURL?.trim() || null,
      });

      // save extra locally (no db error)
      localStorage.setItem(`profile_extra_${u.uid}`, JSON.stringify(extra));

      // ✅ refresh context -> Topbar instant update
      await refreshUser();

      setSuccess("Profile updated ✅");
      setEditMode(false);
    } catch (err) {
      console.log(err);
      setError("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!u) return null;

  const avatar = photoURL || u.photoURL || "https://i.pravatar.cc/100?img=12";

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-3xl bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">My Profile</h2>

          <button
            type="button"
            className={`px-4 py-2 rounded-xl font-semibold ${
              editMode
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={() => {
              resetMsg();
              setEditMode((p) => !p);
            }}
          >
            {editMode ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <img src={avatar} alt="avatar" className="h-16 w-16 rounded-full object-cover border" />
          <div className="leading-tight">
            <h3 className="text-lg font-semibold text-slate-900">{u.displayName || "User"}</h3>
            <p className="text-sm text-slate-600">{u.email}</p>
            <p className="text-xs text-slate-500 mt-1">
              {extra.position || "Position not set"} {extra.company ? `• ${extra.company}` : ""}
            </p>
          </div>
        </div>

        {(error || success) && (
          <div className="mt-4">
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </div>
        )}

        {!editMode && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border">
              <p className="text-slate-500">Position</p>
              <p className="font-medium text-slate-900">{extra.position || "—"}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border">
              <p className="text-slate-500">Company</p>
              <p className="font-medium text-slate-900">{extra.company || "—"}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border">
              <p className="text-slate-500">Phone</p>
              <p className="font-medium text-slate-900">{extra.phone || "—"}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border sm:col-span-2">
              <p className="text-slate-500">Bio</p>
              <p className="font-medium text-slate-900">{extra.bio || "—"}</p>
            </div>
          </div>
        )}

        {editMode && (
          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Name</label>
                <input
                  className="mt-1 w-full border rounded-xl px-3 h-11 outline-none focus:border-blue-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Position</label>
                <input
                  className="mt-1 w-full border rounded-xl px-3 h-11 outline-none focus:border-blue-400"
                  value={extra.position}
                  onChange={(e) => setExtra((p) => ({ ...p, position: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Company</label>
                <input
                  className="mt-1 w-full border rounded-xl px-3 h-11 outline-none focus:border-blue-400"
                  value={extra.company}
                  onChange={(e) => setExtra((p) => ({ ...p, company: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Phone</label>
                <input
                  className="mt-1 w-full border rounded-xl px-3 h-11 outline-none focus:border-blue-400"
                  value={extra.phone}
                  onChange={(e) => setExtra((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">Bio</label>
                <textarea
                  className="mt-1 w-full border rounded-xl px-3 py-2 h-28 outline-none focus:border-blue-400"
                  value={extra.bio}
                  onChange={(e) => setExtra((p) => ({ ...p, bio: e.target.value }))}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Profile Photo (ImgBB Upload)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="mt-2 w-full text-sm"
                  disabled={uploading}
                />
                {uploading && <p className="text-xs text-blue-600 mt-2">Uploading image...</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || uploading}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
