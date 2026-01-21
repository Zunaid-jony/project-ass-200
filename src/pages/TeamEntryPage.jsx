import React, { useEffect, useMemo, useRef, useState } from "react";

/* ======================
   Theme
====================== */
const BRAND = "#1089bc";
const STORAGE_KEY = "babyshop_team_members_v1";

/* ======================
   Helpers
====================== */
function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getInitials(name) {
  const parts = (name || "").trim().split(" ").filter(Boolean);
  if (!parts.length) return "U";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] || "" : "";
  return (first + last).toUpperCase();
}

function isValidUrl(v) {
  if (!v) return true;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

/* ======================
   Toast
====================== */
function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const bg = {
    success: "bg-emerald-50 border-emerald-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-amber-50 border-amber-200",
  };

  const iconBg = {
    success: "bg-emerald-100 text-emerald-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    warning: "bg-amber-100 text-amber-700",
  };

  const icon = {
    success: "✓",
    error: "✕",
    info: "i",
    warning: "!",
  };

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-slideIn">
      <div className={`min-w-[320px] max-w-md rounded-xl border shadow-lg ${bg[toast.type]}`}>
        <div className="p-4 flex items-start gap-3">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold ${iconBg[toast.type]}`}>
            {icon[toast.type]}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
            <p className="text-sm text-slate-600 mt-1">{toast.message}</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          >
            ✕
          </button>
        </div>
        <div className="h-1 bg-slate-200 overflow-hidden">
          <div className="h-full animate-progress" style={{ backgroundColor: BRAND }} />
        </div>
      </div>
    </div>
  );
}

/* ======================
   Confirm Modal
====================== */
function ConfirmModal({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9998] animate-fadeIn">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-scaleIn">
          <div className="p-6 border-b">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <span className="text-red-600 text-xl font-bold">!</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 text-center">{title}</h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 text-center">{message}</p>
          </div>
          <div className="p-6 border-t bg-slate-50 flex justify-center gap-3">
            <button
              onClick={onCancel}
              className="h-11 px-6 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold text-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="h-11 px-6 rounded-xl text-white text-sm font-bold shadow-sm"
              style={{ backgroundColor: "#dc2626" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================
   Inputs
====================== */
function InputField({ label, required, name, value, onChange, placeholder, error }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-700 mb-2 block">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`h-12 w-full rounded-xl border px-4 outline-none transition ${
          error ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-slate-300 focus:ring-2"
        }`}
        style={!error ? { "--tw-ring-color": `${BRAND}55` } : {}}
      />
      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
    </div>
  );
}

function SelectField({ label, required, name, value, onChange, options, placeholder, error }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-700 mb-2 block">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`h-12 w-full rounded-xl border px-4 outline-none transition bg-white ${
          error ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-slate-300 focus:ring-2"
        }`}
        style={!error ? { "--tw-ring-color": `${BRAND}55` } : {}}
      >
        <option value="">{placeholder || "Select..."}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
    </div>
  );
}

function TextAreaField({ label, required, name, value, onChange, placeholder, rows = 4, error }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-700 mb-2 block">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition resize-none ${
          error ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-slate-300 focus:ring-2"
        }`}
        style={!error ? { "--tw-ring-color": `${BRAND}55` } : {}}
      />
      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
    </div>
  );
}

/* ======================
   Photo Upload (Local)
====================== */
function PhotoPicker({ required, photoUrl, onPick, error, fileRef }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-700 mb-2 block">
        Photo {required ? <span className="text-red-500">*</span> : null}
      </label>

      <div className={`rounded-2xl border-2 border-dashed overflow-hidden ${error ? "border-red-400" : "border-slate-300"} bg-slate-50`}>
        <div className="aspect-[4/4] flex items-center justify-center p-4">
          {photoUrl ? (
            <img src={photoUrl} alt="preview" className="h-full w-full object-cover rounded-xl" />
          ) : (
            <div className="text-center">
              <div className="h-14 w-14 mx-auto rounded-full flex items-center justify-center border-2 border-dashed" style={{ borderColor: `${BRAND}55`, backgroundColor: `${BRAND}12` }}>
                <span className="text-xl font-bold" style={{ color: BRAND }}>+</span>
              </div>
              <p className="text-sm font-semibold text-slate-700 mt-3">Upload photo</p>
              <p className="text-xs text-slate-500 mt-1">JPG/PNG/WEBP (max 5MB)</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t">
          <div className="relative">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onPick}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title=" "
            />
            <button
              type="button"
              className="h-10 w-full rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              Choose Photo
            </button>
          </div>
          {error ? <p className="text-xs text-red-500 mt-2">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

/* ======================
   Center Modal (Add/Edit)
====================== */
function MemberModal({ open, onClose, onSubmit, form, setForm, roles, statuses, errors, fileRef, onPickPhoto, editing }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9997] animate-fadeIn">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border animate-scaleIn overflow-hidden">
          {/* Header */}
          <div className="p-6 text-white flex items-center justify-between" style={{ background: `linear-gradient(90deg, ${BRAND}, #0b6f8f)` }}>
            <div>
              <h2 className="text-xl font-bold">{editing ? "Edit Team Member" : "Add New Team Member"}</h2>
              <p className="text-white/80 text-sm mt-1">Saved locally (no Firebase)</p>
            </div>
            <button onClick={onClose} className="h-10 w-10 rounded-xl hover:bg-white/10">✕</button>
          </div>

          <form onSubmit={onSubmit} className="max-h-[calc(100vh-180px)] overflow-y-auto">
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left */}
              <div className="lg:col-span-4 space-y-5">
                <PhotoPicker
                  required={!editing}
                  photoUrl={form.photoUrl}
                  onPick={onPickPhoto}
                  error={errors.photoUrl}
                  fileRef={fileRef}
                />

                <div className="rounded-2xl border p-5 bg-slate-50">
                  <p className="text-sm font-bold text-slate-900 mb-2">Quick Tips</p>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li>• Best: square photo (1:1)</li>
                    <li>• Size: 600×600 বা 800×800</li>
                    <li>• Light background ভালো লাগে</li>
                  </ul>
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    required
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Ayesha Rahman"
                    error={errors.name}
                  />

                  <SelectField
                    label="Role / Designation"
                    required
                    name="role"
                    value={form.role}
                    onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    options={roles}
                    placeholder="Select role"
                    error={errors.role}
                  />

                  <div className="md:col-span-2">
                    <InputField
                      label="Short Title"
                      required
                      name="shortTitle"
                      value={form.shortTitle}
                      onChange={(e) => setForm((p) => ({ ...p, shortTitle: e.target.value }))}
                      placeholder="e.g. Customer Care Lead"
                      error={errors.shortTitle}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <TextAreaField
                      label="Message / Bio"
                      required
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Write short bio..."
                      rows={4}
                      error={errors.message}
                    />
                  </div>

                  <SelectField
                    label="Status"
                    required={false}
                    name="status"
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                    options={statuses}
                    placeholder="Select status"
                    error={errors.status}
                  />

                  <div className="md:col-span-2">
                    <div className="rounded-2xl border bg-slate-50 p-5">
                      <p className="text-sm font-bold text-slate-900 mb-4">Social Links (Optional)</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          label="LinkedIn"
                          name="linkedin"
                          value={form.linkedin}
                          onChange={(e) => setForm((p) => ({ ...p, linkedin: e.target.value }))}
                          placeholder="https://linkedin.com/in/..."
                          error={errors.linkedin}
                        />
                        <InputField
                          label="Facebook"
                          name="facebook"
                          value={form.facebook}
                          onChange={(e) => setForm((p) => ({ ...p, facebook: e.target.value }))}
                          placeholder="https://facebook.com/..."
                          error={errors.facebook}
                        />
                        <InputField
                          label="Instagram"
                          name="instagram"
                          value={form.instagram}
                          onChange={(e) => setForm((p) => ({ ...p, instagram: e.target.value }))}
                          placeholder="https://instagram.com/..."
                          error={errors.instagram}
                        />
                        <InputField
                          label="Website"
                          name="website"
                          value={form.website}
                          onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                          placeholder="https://example.com"
                          error={errors.website}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t p-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                <span className="text-red-500">*</span> Required fields
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setForm((p) => ({ ...p, name: "", role: "", shortTitle: "", message: "" }));
                  }}
                  className="h-11 px-6 rounded-xl border font-semibold hover:bg-slate-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="h-11 px-8 rounded-xl text-white font-bold shadow"
                  style={{ backgroundColor: BRAND }}
                >
                  {editing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ======================
   MAIN (Local Team Page)
====================== */
export default function TeamEntryLocal() {
  const fileRef = useRef(null);

  const roles = [
    "Owner",
    "Store Manager",
    "Sales Executive",
    "Customer Support",
    "Inventory Manager",
    "Delivery Coordinator",
    "Photographer",
    "Content Creator",
  ];
  const statuses = ["Active", "Inactive", "On Leave"];

  const emptyForm = {
    name: "",
    role: "",
    shortTitle: "",
    message: "",
    status: "Active",
    facebook: "",
    instagram: "",
    linkedin: "",
    website: "",
    photoUrl: "",
  };

  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [confirmState, setConfirmState] = useState({ open: false, id: null });

  /* Load Local */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setTeam(JSON.parse(raw));
  }, []);

  /* Save Local */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
  }, [team]);

  const showToast = (type, title, message) => setToast({ type, title, message });

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    if (fileRef.current) fileRef.current.value = "";
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditingId(null);
    setErrors({});
    setForm(emptyForm);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onPickPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("error", "Invalid File", "Only image files allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "Too Large", "Image must be less than 5MB.");
      return;
    }

    try {
      const b64 = await fileToBase64(file); // store in localStorage
      setForm((p) => ({ ...p, photoUrl: b64 }));
      setErrors((p) => ({ ...p, photoUrl: "" }));
    } catch {
      showToast("error", "Error", "Failed to read image.");
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.role.trim()) e.role = "Role is required";
    if (!form.shortTitle.trim()) e.shortTitle = "Short title is required";
    if (!form.message.trim()) e.message = "Message is required";
    if (!editingId && !form.photoUrl) e.photoUrl = "Photo is required";

    // Optional links validation
    if (form.linkedin && !isValidUrl(form.linkedin)) e.linkedin = "Invalid URL";
    if (form.facebook && !isValidUrl(form.facebook)) e.facebook = "Invalid URL";
    if (form.instagram && !isValidUrl(form.instagram)) e.instagram = "Invalid URL";
    if (form.website && !isValidUrl(form.website)) e.website = "Invalid URL";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return team;
    return team.filter((m) =>
      [m.name, m.role, m.shortTitle, m.status].join(" ").toLowerCase().includes(q)
    );
  }, [team, search]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      showToast("error", "Validation", "Please fix required fields.");
      return;
    }

    const payload = {
      id: editingId ?? uid(),
      name: form.name.trim(),
      role: form.role,
      shortTitle: form.shortTitle.trim(),
      message: form.message.trim(),
      status: form.status,
      facebook: form.facebook.trim(),
      instagram: form.instagram.trim(),
      linkedin: form.linkedin.trim(),
      website: form.website.trim(),
      photoUrl: form.photoUrl,
      updatedAt: new Date().toISOString(),
      createdAt: editingId
        ? team.find((t) => t.id === editingId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    };

    setTeam((prev) => {
      if (editingId) return prev.map((x) => (x.id === editingId ? payload : x));
      return [payload, ...prev];
    });

    showToast("success", editingId ? "Updated" : "Saved", editingId ? "Member updated." : "New member added.");
    closeModal();
  };

  const onEdit = (row) => {
    setEditingId(row.id);
    setForm({
      name: row.name || "",
      role: row.role || "",
      shortTitle: row.shortTitle || "",
      message: row.message || "",
      status: row.status || "Active",
      facebook: row.facebook || "",
      instagram: row.instagram || "",
      linkedin: row.linkedin || "",
      website: row.website || "",
      photoUrl: row.photoUrl || "",
    });
    setErrors({});
    if (fileRef.current) fileRef.current.value = "";
    setOpen(true);
  };

  const askDelete = (id) => setConfirmState({ open: true, id });
  const cancelDelete = () => setConfirmState({ open: false, id: null });
  const confirmDelete = () => {
    const id = confirmState.id;
    setTeam((prev) => prev.filter((x) => x.id !== id));
    setConfirmState({ open: false, id: null });
    showToast("success", "Deleted", "Member deleted successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <ConfirmModal
        open={confirmState.open}
        title="Delete Team Member"
        message="Are you sure you want to delete this member? This cannot be undone."
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />

      <MemberModal
        open={open}
        onClose={closeModal}
        onSubmit={onSubmit}
        form={form}
        setForm={setForm}
        roles={roles}
        statuses={statuses}
        errors={errors}
        fileRef={fileRef}
        onPickPhoto={onPickPhoto}
        editing={!!editingId}
      />

      {/* ========= TOP BAR ========= */}
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-6 text-white shadow-lg mb-6"
             style={{ background: `linear-gradient(90deg, ${BRAND}, #0b6f8f)` }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold">Team Management</h1>
              <p className="text-white/80 mt-1 text-sm">
                Add / Edit / Delete team members (Saved locally)
              </p>
            </div>

            <button
              onClick={openNew}
              className="h-11 px-6 rounded-xl bg-white text-slate-900 font-bold shadow hover:opacity-95"
            >
              + New Member
            </button>
          </div>
        </div>

        {/* ========= TABLE CARD ========= */}
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Members Table</h2>
              <p className="text-sm text-slate-500">Manage from here</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search member..."
                  className="h-11 w-full sm:w-80 pl-9 pr-4 rounded-xl border outline-none focus:ring-2"
                  style={{ "--tw-ring-color": `${BRAND}55` }}
                />
              </div>

              <button
                onClick={openNew}
                className="h-11 px-5 rounded-xl text-white font-bold shadow"
                style={{ backgroundColor: BRAND }}
              >
                + New
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Member</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Role</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Short Title</th>
                  <th className="text-right p-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-500">
                      No member found. Click <b>New</b> to add.
                    </td>
                  </tr>
                ) : (
                  filtered.map((m) => (
                    <tr key={m.id} className="border-b hover:bg-slate-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-full overflow-hidden border bg-slate-100 flex items-center justify-center">
                            {m.photoUrl ? (
                              <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" />
                            ) : (
                              <span className="font-bold text-slate-700">{getInitials(m.name)}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{m.name}</p>
                            <p className="text-xs text-slate-500">{m.website || m.linkedin || ""}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-slate-700">{m.role}</td>

                      <td className="p-4">
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor:
                              m.status === "Active" ? "#dcfce7" : m.status === "On Leave" ? "#fef3c7" : "#f1f5f9",
                            color: m.status === "Active" ? "#166534" : m.status === "On Leave" ? "#92400e" : "#334155",
                          }}
                        >
                          {m.status}
                        </span>
                      </td>

                      <td className="p-4 text-slate-700 max-w-[360px]">
                        <span className="line-clamp-1">{m.shortTitle}</span>
                      </td>

                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onEdit(m)}
                            className="h-9 px-4 rounded-xl border font-bold hover:bg-slate-50"
                            style={{ borderColor: `${BRAND}55`, color: BRAND }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => askDelete(m.id)}
                            className="h-9 px-4 rounded-xl border font-bold text-red-700 border-red-200 bg-red-50 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 border-t text-sm text-slate-600 flex items-center justify-between">
            <p>
              Showing <b>{filtered.length}</b> of <b>{team.length}</b>
            </p>
            <button
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setTeam([]);
                showToast("info", "Cleared", "All local members removed.");
              }}
              className="text-sm font-bold hover:underline"
              style={{ color: BRAND }}
            >
              Clear All (Local)
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes progress { from { width: 100%; } to { width: 0%; } }
        .animate-slideIn { animation: slideIn .25s ease-out; }
        .animate-fadeIn { animation: fadeIn .2s ease-out; }
        .animate-scaleIn { animation: scaleIn .2s ease-out; }
        .animate-progress { animation: progress 2.6s linear forwards; }
      `}</style>
    </div>
  );
}
