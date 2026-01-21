import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";

/* ======================
   Brand Color
====================== */
const BRAND = "#1089bc";

/* ======================
   API Base
====================== */
const BASE_URL = "http://projectdetails.runasp.net";

/* ✅ BLOG APIs (As you provided) */
const BLOG_LIST_URL = `${BASE_URL}/api/Blog/blogs`;
const BLOG_GET_URL = (id) => `${BASE_URL}/api/Blog/GetBlogById?BlogID=${id}`;
const BLOG_CREATE_URL = `${BASE_URL}/api/Blog/CreateBlog`;
const BLOG_UPDATE_URL = `${BASE_URL}/api/Blog/UpdateBlog`;
const BLOG_DELETE_URL = (id) => `${BASE_URL}/api/Blog/DeleteBlogById?BlogID=${id}`;

/* ✅ Blog Category list (for dropdown - required BlogCategoryID) */
const BLOG_CATEGORY_LIST_URL = `${BASE_URL}/api/Blog/GetAllCategory_Blogs`;

/* ======================
   Utils
====================== */
const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;
const toNumber = (v) => (v === "" || v === null || v === undefined ? 0 : Number(v));

const safeJson = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

// ✅ relative image => absolute image
const makeAbsUrl = (path) => {
  if (!path) return "";
  const s = String(path);
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/")) return `${BASE_URL}${s}`;
  return `${BASE_URL}/${s}`;
};

/* ======================
   Toast
====================== */
function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const styles =
    toast.type === "success"
      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
      : toast.type === "error"
      ? "border-red-500 bg-red-50 text-red-800"
      : "border-blue-500 bg-blue-50 text-blue-800";

  return (
    <div className="fixed top-5 right-5 z-[9999]">
      <div className={`min-w-[280px] max-w-[420px] rounded-xl border-l-4 p-4 shadow-lg ${styles}`}>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="font-semibold text-sm">{toast.title}</p>
            <p className="text-sm opacity-90 mt-1">{toast.message}</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-black/5 flex items-center justify-center"
            aria-label="Close toast"
            type="button"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

/* ======================
   Confirm Modal
====================== */
function ConfirmModal({ open, title, message, onCancel, onConfirm, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9998]">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={onCancel} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border overflow-hidden">
          <div className="p-5 border-b">
            <p className="text-lg font-bold text-slate-900">{title}</p>
            <p className="text-sm text-slate-600 mt-1">{message}</p>
          </div>
          <div className="p-5 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="h-11 px-5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold"
              type="button"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="h-11 px-5 rounded-xl text-white font-semibold disabled:opacity-60"
              style={{ backgroundColor: "#e11d48" }}
              type="button"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================
   Modal (fixed + scroll + sticky footer)
====================== */
function EntryModal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9998]">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-3 md:p-6">
        <div className="w-full max-w-6xl rounded-3xl bg-white shadow-2xl border overflow-hidden flex flex-col max-h-[92vh]">
          <div className="p-4 md:p-5 border-b flex items-center justify-between shrink-0">
            <p className="text-lg font-extrabold text-slate-900">{title}</p>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="p-0 overflow-auto flex-1">{children}</div>

          {footer ? <div className="p-4 md:p-5 border-t bg-white shrink-0">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}

/* ======================
   Image Upload (new uploads only)
   ✅ Swagger: Images required (Create), optional (Update)
====================== */
function ImageUpload({ images, onAdd, onRemove, maxImages = 6, required = false }) {
  const fileRef = useRef(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Blog Images {required ? <span className="text-red-500">*</span> : null}
          </p>
          <p className="text-xs text-slate-500 mt-1">Up to {maxImages} images.</p>
        </div>
        <p className="text-xs text-slate-600">
          {images.length}/{maxImages}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={images.length >= maxImages}
          className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition
            ${
              images.length >= maxImages
                ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                : "border-slate-300 hover:border-[var(--brand)] hover:bg-slate-50"
            }`}
          style={{ ["--brand"]: BRAND }}
        >
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: images.length >= maxImages ? "#cbd5e1" : BRAND }}
          >
            +
          </div>
          <p className="text-xs font-semibold">Add</p>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (!files.length) return;
              onAdd(files);
              e.target.value = "";
            }}
          />
        </button>

        {images.map((img, idx) => (
          <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden border bg-white">
            <img src={img.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-slate-700"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================
   FormData builder (Swagger style)
   ✅ field names: BlogCategoryID, ProductID, Name, Description, StatusID, CreatedBy, Images
   ✅ update: BlogID required
====================== */
const buildBlogFormData = ({
  blogId, // for update only
  blogCategoryId,
  productId,
  name,
  description,
  statusId,
  createdBy,
  images = [], // File list
}) => {
  const fd = new FormData();

  if (blogId !== null && blogId !== undefined) fd.append("BlogID", String(blogId));

  fd.append("BlogCategoryID", String(blogCategoryId ?? 0));
  fd.append("ProductID", String(productId ?? 0));
  fd.append("Name", name ?? "");
  fd.append("Description", description ?? "");
  fd.append("StatusID", String(statusId ?? 0));
  fd.append("CreatedBy", String(createdBy ?? 0));

  // Images[] (FromForm)
  images.forEach((img) => {
    if (img?.file instanceof File) fd.append("Images", img.file);
  });

  return fd;
};

/* ======================
   Map API response -> row
====================== */
const mapApiBlog = (x) => {
  const blogId = x?.blogID ?? x?.BlogID ?? x?.blogId ?? x?.BlogId ?? 0;
  const blogCategoryId = x?.blogCategoryID ?? x?.BlogCategoryID ?? x?.blogCategoryId ?? 0;
  const productId = x?.productID ?? x?.ProductID ?? x?.productId ?? 0;
  const name = x?.name ?? x?.Name ?? "";
  const description = x?.description ?? x?.Description ?? "";
  const statusId = x?.statusID ?? x?.StatusID ?? x?.statusId ?? 0;
  const createdBy = x?.createdBy ?? x?.CreatedBy ?? 0;

  const imgsRaw = Array.isArray(x?.images) ? x.images : Array.isArray(x?.Images) ? x.Images : [];
  const images = imgsRaw.map(makeAbsUrl);

  return {
    id: blogId,
    blogId,
    blogCategoryId,
    productId,
    name,
    description,
    statusId: Number(statusId || 0),
    createdBy: Number(createdBy || 0),
    images,
    coverImageUrl: images[0] || "",
    raw: x,
  };
};

/* ======================
   Pagination (Like your UI)
====================== */
function Pagination({ page, totalPages, onFirst, onPrev, onNext, onLast }) {
  if (totalPages <= 1) return null;

  const iconBtn =
    "h-9 w-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center";
  const circleBtn = "h-9 w-9 rounded-full border-2 flex items-center justify-center font-bold";

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={onFirst} disabled={page <= 1} className={iconBtn} title="First">
        ««
      </button>
      <button type="button" onClick={onPrev} disabled={page <= 1} className={iconBtn} title="Prev">
        ‹
      </button>

      <button
        type="button"
        className={circleBtn}
        style={{ borderColor: BRAND, color: BRAND, backgroundColor: "transparent" }}
        title="Current"
      >
        {page}
      </button>

      <button type="button" onClick={onNext} disabled={page >= totalPages} className={iconBtn} title="Next">
        ›
      </button>
      <button type="button" onClick={onLast} disabled={page >= totalPages} className={iconBtn} title="Last">
        »»
      </button>
    </div>
  );
}

/* ======================
   Main Page: Blog Entry
====================== */
export default function BlogEntryPage() {
  const emptyForm = {
    blogCategoryId: 0,
    productId: 0,
    name: "",
    description: "",
    statusId: 0,
    createdBy: 0,
    images: [], // new uploads only
  };

  const [allBlogs, setAllBlogs] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); // BlogID
  const [modalOpen, setModalOpen] = useState(false);

  const [serverImages, setServerImages] = useState([]); // just for preview in edit
  const [toast, setToast] = useState(null);
  const [confirmState, setConfirmState] = useState({ open: false, id: null });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");

  // dropdown: category
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const showToast = (type, title, message) => setToast({ type, title, message });

  /* ✅ Category dropdown load */
  useEffect(() => {
    const fetchBlogCategories = async () => {
      setCategoryLoading(true);
      try {
        const res = await fetch(BLOG_CATEGORY_LIST_URL);
        const data = await safeJson(res);

        const arr = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.result)
          ? data.result
          : [];

        // assume fields: categoryId, categoryName (or BlogCategoryID, CategoryName)
        const opts = arr
          .map((x) => ({
            label: x?.categoryName ?? x?.CategoryName ?? x?.name ?? x?.Name ?? `Category ${x?.categoryId ?? x?.BlogCategoryID ?? ""}`,
            value: x?.categoryId ?? x?.CategoryId ?? x?.BlogCategoryID ?? x?.blogCategoryID ?? 0,
          }))
          .filter((o) => o.value !== 0);

        setCategoryOptions(opts);

        // keep selected if exists
        setForm((p) => ({
          ...p,
          blogCategoryId: opts.some((o) => o.value === p.blogCategoryId) ? p.blogCategoryId : 0,
        }));
      } catch {
        setCategoryOptions([]);
        showToast("error", "Category Load Failed", "Blog category load হয়নি");
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchBlogCategories();
  }, []);

  /* ✅ Fetch list */
  const fetchAllBlogs = async () => {
    setTableLoading(true);
    try {
      const res = await fetch(BLOG_LIST_URL);
      const data = await safeJson(res);

      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.result)
        ? data.result
        : [];

      const mapped = arr.map(mapApiBlog);
      setAllBlogs(mapped);
      setPage(1);
    } catch {
      showToast("error", "Load Failed", "Blog list load হয়নি");
      setAllBlogs([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  /* ✅ Validation */
  const validate = () => {
    if (!toNumber(form.blogCategoryId)) return "Blog Category required";
    if (!toNumber(form.productId)) return "ProductID required";
    if (!form.name.trim()) return "Name required";

    // Create: Images required
    if (!editingId && form.images.length === 0) return "At least 1 image required";

    // Update: swagger shows Images optional; allow 0
    return "";
  };

  /* ✅ Upload handlers */
  const onImagesAdd = (files) => {
    const imgs = files
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: uid(),
        url: URL.createObjectURL(f),
        name: f.name,
        file: f,
      }));

    setForm((p) => ({ ...p, images: [...p.images, ...imgs].slice(0, 6) }));
  };

  const removeNewUpload = (idx) => {
    setForm((p) => {
      const copy = [...p.images];
      if (copy[idx]?.url?.startsWith("blob:")) URL.revokeObjectURL(copy[idx].url);
      copy.splice(idx, 1);
      return { ...p, images: copy };
    });
  };

  const resetForm = () => {
    form.images.forEach((im) => {
      if (im?.url?.startsWith("blob:")) URL.revokeObjectURL(im.url);
    });
    setEditingId(null);
    setForm(emptyForm);
    setServerImages([]);
  };

  /* ✅ Create */
  const apiCreateBlog = async () => {
    const fd = buildBlogFormData({
      blogId: null,
      blogCategoryId: toNumber(form.blogCategoryId),
      productId: toNumber(form.productId),
      name: form.name.trim(),
      description: form.description.trim(),
      statusId: toNumber(form.statusId),
      createdBy: toNumber(form.createdBy),
      images: form.images,
    });

    const res = await fetch(BLOG_CREATE_URL, { method: "POST", body: fd });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?.error || "Create failed");
    return data;
  };

  /* ✅ Update
     NOTE: backend rules unknown:
     - If backend keeps old images when Images not sent, this works.
     - If backend overwrites images only when new Images sent, this also works.
  */
  const apiUpdateBlog = async (blogId) => {
    const fd = buildBlogFormData({
      blogId,
      blogCategoryId: toNumber(form.blogCategoryId),
      productId: toNumber(form.productId),
      name: form.name.trim(),
      description: form.description.trim(),
      statusId: toNumber(form.statusId),
      createdBy: toNumber(form.createdBy),
      images: form.images, // send only newly uploaded
    });

    const res = await fetch(BLOG_UPDATE_URL, { method: "PUT", body: fd });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?.error || "Update failed");
    return data;
  };

  /* ✅ Delete */
  const apiDeleteBlog = async (blogId) => {
    const res = await fetch(BLOG_DELETE_URL(blogId), { method: "DELETE" });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?.error || "Delete failed");
    return data;
  };

  /* ✅ Get for edit */
  const apiGetBlog = async (blogId) => {
    const res = await fetch(BLOG_GET_URL(blogId));
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?.error || "Get failed");
    return data;
  };

  /* ✅ Submit */
  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return showToast("error", "Validation", err);

    setSaving(true);
    try {
      if (editingId) {
        await apiUpdateBlog(editingId);
        showToast("success", "Saved", "Blog updated successfully");
      } else {
        await apiCreateBlog();
        showToast("success", "Saved", "Blog created successfully");
      }

      await fetchAllBlogs();
      resetForm();
      setModalOpen(false);
    } catch (ex) {
      showToast("error", "API Error", ex?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  /* ✅ Edit */
  const onEdit = async (row) => {
    const bid = row?.blogId ?? row?.id;
    if (!bid) return;

    setEditingId(bid);
    setModalOpen(true);

    try {
      const data = await apiGetBlog(bid);

      // some APIs wrap inside data/result
      const x = data?.data ? data.data : data?.result ? data.result : data;
      const mapped = mapApiBlog(x);

      setServerImages(mapped.images);

      setForm((p) => ({
        ...p,
        blogCategoryId: mapped.blogCategoryId || 0,
        productId: mapped.productId || 0,
        name: mapped.name || "",
        description: mapped.description || "",
        statusId: mapped.statusId || 0,
        createdBy: mapped.createdBy || 0,
        images: [], // new uploads empty on open
      }));
    } catch {
      showToast("error", "Load Failed", "Edit data load হয়নি");
    }
  };

  /* ✅ Delete */
  const confirmDelete = async () => {
    const id = confirmState.id;
    if (!id) return;

    setDeleting(true);
    try {
      await apiDeleteBlog(Number(id));
      showToast("success", "Deleted", "Blog deleted successfully");
      setConfirmState({ open: false, id: null });
      await fetchAllBlogs();
    } catch (ex) {
      showToast("error", "API Error", ex?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  /* ✅ Filter */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allBlogs;

    return allBlogs.filter((b) =>
      [String(b.blogId), b.name, b.description, String(b.blogCategoryId), String(b.productId)]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [allBlogs, search]);

  /* ✅ Pagination calc */
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  /* ✅ Modal images: server preview + new uploads preview */
  const modalImages = useMemo(() => {
    const srv = (serverImages || []).map((u, index) => ({
      id: `srv_${index}_${u}`,
      url: u,
      file: null,
      isServer: true,
    }));
    const newOnes = (form.images || []).map((x) => ({ ...x, isServer: false }));
    return [...srv, ...newOnes].slice(0, 6);
  }, [serverImages, form.images]);

  // remove only new uploads (server preview cannot be removed because API has no DeletedImages param)
  const onModalRemoveImage = (idx) => {
    const srvCount = serverImages?.length || 0;
    if (idx < srvCount) {
      // just block to avoid wrong expectation
      showToast(
        "info",
        "Info",
        "Server images delete API নাই। Update এ নতুন image দিলে backend rule অনুযায়ী handle হবে।"
      );
      return;
    }
    const newIdx = idx - srvCount;
    removeNewUpload(newIdx);
  };

  return (
    <div className="min-h-screen bg-[#eaf6fb] p-4 md:p-6 -mt-10">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <ConfirmModal
        open={confirmState.open}
        title="Delete Blog"
        message="Are you sure? This cannot be undone."
        onCancel={() => setConfirmState({ open: false, id: null })}
        onConfirm={confirmDelete}
        loading={deleting}
      />

      {/* ===== Blog Modal ===== */}
      <EntryModal
        open={modalOpen}
        title={editingId ? "Edit Blog" : "Add New Blog"}
        onClose={() => setModalOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="h-11 px-6 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 font-semibold text-slate-700"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => document.getElementById("blog-form")?.requestSubmit?.()}
              disabled={saving}
              className="h-11 px-8 rounded-2xl text-white font-extrabold shadow disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: BRAND }}
            >
              {saving ? "Saving..." : editingId ? "Update Blog" : "Save Blog"}
            </button>
          </div>
        }
      >
        <form id="blog-form" onSubmit={onSubmit} className="p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Blog Category */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Blog Category <span className="text-red-500">*</span>
              </label>

              <div className="mt-2">
                <Dropdown
                  value={toNumber(form.blogCategoryId) || 0}
                  options={categoryOptions}
                  optionLabel="label"
                  optionValue="value"
                  placeholder={categoryLoading ? "Loading..." : "Select Category"}
                  disabled={categoryLoading}
                  filter
                  appendTo="self"
                  baseZIndex={2000}
                  className="w-full"
                  onChange={(e) => setForm((p) => ({ ...p, blogCategoryId: toNumber(e.value) }))}
                  pt={{
                    root: {
                      className:
                        "h-12 rounded-xl border border-slate-300 bg-white flex items-center",
                    },
                    input: { className: "px-4 text-slate-700 font-medium" },
                    trigger: {
                      className:
                        "bg-[#4f5bd5] w-12 h-full flex items-center justify-center rounded-tr-md rounded-br-md text-white",
                    },
                    panel: {
                      className:
                        "rounded-xl overflow-hidden border border-slate-200 shadow-xl bg-white",
                    },
                    item: {
                      className:
                        "px-4 py-3 text-slate-700 hover:bg-slate-100 cursor-pointer",
                    },
                    filterContainer: {
                      className: "p-3 border-b border-slate-100",
                    },
                    filterInput: {
                      className:
                        "w-full px-3 py-2 border border-slate-200 rounded-lg outline-none",
                    },
                  }}
                />
              </div>
            </div>

            {/* ProductID */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                ProductID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.productId}
                onChange={(e) => setForm((p) => ({ ...p, productId: toNumber(e.target.value) }))}
                className="mt-2 w-full h-12 px-4 rounded-2xl border border-slate-300 outline-none focus:ring-2 focus:ring-[var(--brand)]"
                style={{ ["--brand"]: BRAND }}
                required
              />
            </div>

            {/* StatusID */}
            <div>
              <label className="text-sm font-semibold text-slate-700">StatusID</label>
              <input
                type="number"
                value={form.statusId}
                onChange={(e) => setForm((p) => ({ ...p, statusId: toNumber(e.target.value) }))}
                className="mt-2 w-full h-12 px-4 rounded-2xl border border-slate-300 outline-none focus:ring-2 focus:ring-[var(--brand)]"
                style={{ ["--brand"]: BRAND }}
              />
            </div>

            {/* Name */}
            <div className="lg:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="mt-2 w-full h-12 px-4 rounded-2xl border border-slate-300 outline-none focus:ring-2 focus:ring-[var(--brand)]"
                style={{ ["--brand"]: BRAND }}
                required
              />
            </div>

            {/* CreatedBy */}
            <div>
              <label className="text-sm font-semibold text-slate-700">CreatedBy</label>
              <input
                type="number"
                value={form.createdBy}
                onChange={(e) => setForm((p) => ({ ...p, createdBy: toNumber(e.target.value) }))}
                className="mt-2 w-full h-12 px-4 rounded-2xl border border-slate-300 outline-none focus:ring-2 focus:ring-[var(--brand)]"
                style={{ ["--brand"]: BRAND }}
              />
            </div>

            {/* Description */}
            <div className="lg:col-span-3">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={4}
                className="mt-2 w-full px-4 py-3 rounded-2xl border border-slate-300 outline-none focus:ring-2 focus:ring-[var(--brand)]"
                style={{ ["--brand"]: BRAND }}
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <ImageUpload
              images={modalImages}
              onAdd={onImagesAdd}
              onRemove={onModalRemoveImage}
              required={!editingId} // create required
            />

            {editingId && (serverImages?.length || 0) > 0 && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-600">
                  ℹ️ Existing images শুধু preview. Delete করার API না থাকায় server image remove অপশন নেই।
                </p>
              </div>
            )}
          </div>
        </form>
      </EntryModal>

      {/* ===== Dashboard Table ===== */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg border overflow-hidden">
        <div className="p-6 md:p-8 border-b">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Blogs</h3>
              <p className="text-sm text-slate-500">Dashboard table from API</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-[260px] h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[var(--brand)]"
                style={{ ["--brand"]: BRAND }}
              />

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setEditingId(null);
                  setModalOpen(true);
                }}
                className="h-11 px-5 rounded-xl text-white font-bold shadow"
                style={{ backgroundColor: BRAND }}
              >
                + New Blog
              </button>
            </div>
          </div>
        </div>

        {tableLoading ? (
          <div className="p-10 text-center text-slate-500">Loading...</div>
        ) : paged.length === 0 ? (
          <div className="p-10 text-center text-slate-500">No blogs found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b">
                <tr>
                  <th className="py-3 px-5 text-left">Blog</th>
                  <th className="py-3 px-5 text-center">CategoryID</th>
                  <th className="py-3 px-5 text-center">ProductID</th>
                  <th className="py-3 px-5 text-center">StatusID</th>
                  <th className="py-3 px-5 text-center">Images</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {paged.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl overflow-hidden border bg-slate-100">
                          {b.coverImageUrl ? (
                            <img src={b.coverImageUrl} alt="" className="h-full w-full object-cover" />
                          ) : null}
                        </div>
                        <div className="min-w-[240px]">
                          <p className="font-bold text-slate-900">{b.name}</p>
                          <p className="text-xs text-slate-500">BlogID: {b.blogId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-center font-bold text-slate-900">
                      {toNumber(b.blogCategoryId)}
                    </td>

                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700">
                        {toNumber(b.productId)}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-center">{toNumber(b.statusId)}</td>

                    <td className="py-4 px-5 text-center">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          {b.images.length} images
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(b)}
                          className="h-10 px-4 rounded-xl font-bold bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfirmState({ open: true, id: b.blogId })}
                          className="h-10 px-4 rounded-xl font-bold bg-red-50 text-red-700 hover:bg-red-100"
                          disabled={deleting}
                        >
                          {deleting && confirmState.id === b.blogId ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bottom bar */}
        <div className="p-5 border-t flex items-center justify-between gap-3 text-sm text-slate-600">
          <p>
            Showing <span className="font-bold">{paged.length}</span> of{" "}
            <span className="font-bold">{filtered.length}</span>
          </p>

          <div className="flex items-center gap-3">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="h-9 px-3 rounded-lg border border-slate-200 bg-white"
              title="Rows per page"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <Pagination
              page={safePage}
              totalPages={totalPages}
              onFirst={() => setPage(1)}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
              onLast={() => setPage(totalPages)}
            />

            <button
              onClick={fetchAllBlogs}
              className="font-bold hover:underline"
              style={{ color: BRAND }}
              type="button"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
