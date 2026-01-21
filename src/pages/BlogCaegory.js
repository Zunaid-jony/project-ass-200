import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { apiGet, apiPost, apiPut, apiDelete } from "../api/apiClient";

const BRAND = "#1089bc";

/**
 * ✅ BLOG API (User provided)
 * - LIST:     GET  /api/Blog/GetAllCategory_Blogs
 * - GET by id GET  /api/Blog/Get_BlogCategoryByID?BlogCategoryID=1
 * - CREATE:   POST /api/Blog/Create_BlogCategory
 * - UPDATE:   PUT  /api/Blog/Update_BlogCategory
 * - DELETE:   DELETE /api/Blog/Delete_BlogCategory?BlogCategoryID=1
 */
const API = {
  list: "/api/Blog/GetAllCategory_Blogs",
  getById: (id) => `/api/Blog/Get_BlogCategoryByID?BlogCategoryID=${id}`,
  create: "/api/Blog/Create_BlogCategory",
  update: "/api/Blog/Update_BlogCategory",
  delete: (id) => `/api/Blog/Delete_BlogCategory?BlogCategoryID=${id}`,
};

/* ----------------------------- Toast UI ----------------------------- */
function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const color =
    toast.type === "success"
      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
      : toast.type === "error"
      ? "border-red-500 bg-red-50 text-red-800"
      : "border-blue-500 bg-blue-50 text-blue-800";

  return (
    <div className="fixed top-5 right-5 z-[9999]">
      <div className={`rounded-xl border-l-4 shadow-lg p-4 min-w-[260px] ${color}`}>
        <div className="flex justify-between gap-3">
          <div>
            <p className="font-bold text-sm">{toast.title}</p>
            <p className="text-sm mt-1">{toast.message}</p>
          </div>

          <button onClick={onClose} className="font-bold" type="button">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Confirm Delete Modal ------------------------- */
function ConfirmModal({ open, onCancel, onConfirm, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
        <div className="p-6 border-b">
          <h3 className="font-bold text-lg text-slate-900">Delete Blog Category</h3>
          <p className="text-sm text-slate-600 mt-1">
            Are you sure? This action cannot be undone.
          </p>
        </div>

        <div className="p-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="h-11 px-5 rounded-xl border font-semibold"
            type="button"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="h-11 px-5 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 disabled:opacity-60"
            type="button"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Add/Edit Modal ------------------------- */
function CategoryModal({ open, onClose, formik, saving, isEdit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">
            {isEdit ? "Edit Blog Category" : "New Blog Category"}
          </h2>

          <button onClick={onClose} className="text-xl font-bold" type="button">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              name="categoryName"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. Tech News"
              className="mt-2 w-full h-11 px-4 rounded-xl border outline-none focus:ring-2"
              style={{ outlineColor: BRAND }}
            />
            {formik.touched.categoryName && formik.errors.categoryName ? (
              <p className="text-xs text-red-600 mt-1">{formik.errors.categoryName}</p>
            ) : null}
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea
              name="categoryDescription"
              value={formik.values.categoryDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Short description..."
              className="mt-2 w-full min-h-[90px] p-3 rounded-xl border outline-none focus:ring-2"
              style={{ outlineColor: BRAND }}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Category Type ID</label>
            <input
              name="categoryTypeID"
              type="number"
              value={formik.values.categoryTypeID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="0"
              className="mt-2 w-full h-11 px-4 rounded-xl border outline-none focus:ring-2"
              style={{ outlineColor: BRAND }}
            />
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="h-11 px-5 rounded-xl border font-semibold"
            type="button"
            disabled={saving}
          >
            Cancel
          </button>

          <button
            onClick={formik.handleSubmit}
            className="h-11 px-5 rounded-xl text-white font-bold disabled:opacity-60"
            style={{ backgroundColor: BRAND }}
            type="button"
            disabled={saving}
          >
            {saving ? "Saving..." : isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Page ------------------------------ */
export const BlogCategory = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // number | null

  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const showToast = (type, title, message) => setToast({ type, title, message });

  /* ------------------------------ Load List ------------------------------ */
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await apiGet(API.list);

      // ✅ handle different response shapes
      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.result)
        ? data.result
        : [];

      setList(arr);
    } catch (e) {
      showToast("error", "Load Failed", e?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ------------------------------ Formik ------------------------------ */
  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryDescription: "",
      categoryTypeID: 0,
    },
    validate: (values) => {
      const errors = {};
      if (!values.categoryName?.trim()) errors.categoryName = "Category name required";
      return errors;
    },
    onSubmit: async (values) => {
      setSaving(true);

      try {
        const payload = {
          categoryId: editingId ?? 0,
          categoryName: values.categoryName.trim(),
          categoryDescription: values.categoryDescription?.trim() || "",
          categoryTypeID: Number(values.categoryTypeID || 0),
          statusId: 0,
          createdDate: new Date().toISOString(),
          createdBy: 0,
          keyEntry1: "",
          keyEntry2: "",
        };

        if (editingId !== null) {
          // ✅ UPDATE
          await apiPut(API.update, payload);
          showToast("success", "Updated", "Blog category updated");
        } else {
          // ✅ CREATE
          await apiPost(API.create, payload);
          showToast("success", "Saved", "Blog category added");
        }

        setModalOpen(false);
        setEditingId(null);
        formik.resetForm();
        fetchCategories();
      } catch (e) {
        console.error(e);
        showToast("error", "Save Failed", e?.message || "Request failed");
      } finally {
        setSaving(false);
      }
    },
  });

  /* ------------------------------ Actions ------------------------------ */
  const openNew = () => {
    setEditingId(null);
    formik.resetForm();
    setModalOpen(true);
  };

  const openEdit = async (id) => {
    setEditingId(id);
    setSaving(true);

    try {
      const data = await apiGet(API.getById(id));

      // ✅ handle different key casing
      const name = data?.categoryName ?? data?.CategoryName ?? "";
      const desc = data?.categoryDescription ?? data?.CategoryDescription ?? "";
      const typeId = data?.categoryTypeID ?? data?.CategoryTypeID ?? 0;

      formik.setValues({
        categoryName: name || "",
        categoryDescription: desc || "",
        categoryTypeID: Number(typeId || 0),
      });

      setModalOpen(true);
    } catch (e) {
      showToast("error", "Edit Load Failed", e?.message || "Failed to load category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmId) return;

    setDeleting(true);
    try {
      await apiDelete(API.delete(confirmId));
      showToast("success", "Deleted", "Blog category deleted");
      setConfirmId(null);
      fetchCategories();
    } catch (e) {
      showToast("error", "Delete Failed", e?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  /* ------------------------------ Filter ------------------------------ */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return list.filter((x) =>
      `${x.categoryId ?? ""} ${x.categoryName ?? ""}`.toLowerCase().includes(q)
    );
  }, [list, search]);

  /* ------------------------------ UI ------------------------------ */
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <ConfirmModal
        open={!!confirmId}
        onCancel={() => setConfirmId(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        formik={formik}
        saving={saving}
        isEdit={editingId !== null}
      />

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow border">
        <div className="p-5 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Blog Categories</h1>
            <p className="text-sm text-slate-500">Manage blog category entries</p>
          </div>

          <div className="flex gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-11 px-4 rounded-xl border outline-none"
            />

            <button
              onClick={openNew}
              className="h-11 px-5 rounded-xl text-white font-bold"
              style={{ backgroundColor: BRAND }}
              type="button"
            >
              + New Category
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="py-3 px-5 text-left">Category ID</th>
                <th className="py-3 px-5 text-left">Category Name</th>
                <th className="py-3 px-5 text-left">Type</th>
                <th className="py-3 px-5 text-left">Description</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No category found
                  </td>
                </tr>
              ) : (
                filtered.map((x, idx) => (
                  <tr key={x.categoryId ?? idx} className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-semibold">{x.categoryId}</td>
                    <td className="py-3 px-5">{x.categoryName}</td>
                    <td className="py-3 px-5">{x.categoryTypeID ?? x.categoryTypeId ?? 0}</td>
                    <td className="py-3 px-5">
                      {x.categoryDescription ?? x.CategoryDescription ?? ""}
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(x.categoryId)}
                          className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold"
                          type="button"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setConfirmId(x.categoryId)}
                          className="px-4 py-2 rounded-lg bg-red-50 text-red-700 font-semibold"
                          type="button"
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
      </div>
    </div>
  );
};

export default BlogCategory;
