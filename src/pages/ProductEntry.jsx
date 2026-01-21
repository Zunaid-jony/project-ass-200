import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import { auth } from "../firebase/auth";

/* ======================
   Toast - Redesigned
====================== */
function Toast({ toast, onClose }) {
  if (!toast) return null;
  
  const bgColor = toast.type === "success" ? "bg-green-50 border-green-500" 
                 : toast.type === "error" ? "bg-red-50 border-red-500" 
                 : "bg-blue-50 border-blue-500";
  
  const icon = toast.type === "success" ? "✅" 
               : toast.type === "error" ? "❌" 
               : "ℹ️";

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-slide-in">
      <div className={`${bgColor} border-l-4 rounded-xl shadow-lg p-4 min-w-[320px] max-w-md`}>
        <div className="flex items-start gap-3">
          <span className="text-xl">{icon}</span>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{toast.title}</p>
            <p className="text-sm text-gray-600 mt-1">{toast.message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ======================
   Confirm Modal - Redesigned
====================== */
function ConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9998] animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scale-in">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-lg text-gray-900">Delete Product</p>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this product? All associated data will be permanently removed.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================
   Image Upload - Enhanced
====================== */
function ImageUpload({ images = [], onAdd, onRemove, maxImages = 6 }) {
  const inputRef = useRef(null);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
    }));

    onAdd(newImages);
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-medium text-gray-900">Product Images</span>
          <span className="text-red-500 ml-1">*</span>
          <p className="text-sm text-gray-500 mt-1">Upload up to {maxImages} images</p>
        </div>
        <span className="text-sm text-gray-500">
          {images.length}/{maxImages}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Upload Button */}
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          disabled={images.length >= maxImages}
          className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
            images.length >= maxImages
              ? "border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
          }`}
        >
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm text-gray-500 mt-2">Add Image</span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFiles}
        />

        {/* Image Previews */}
        {images.map((img, index) => (
          <div
            key={img.id}
            className="relative aspect-square group rounded-xl overflow-hidden border border-gray-200"
          >
            <img
              src={img.url}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to remove
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================
   IMGBB Upload
====================== */
const IMGBB_KEY = "913bebf03535b289356af3a58c8299bd";

async function uploadToImgbb(file) {
  const fd = new FormData();
  fd.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
    { method: "POST", body: fd }
  );
  const json = await res.json();

  if (!json.success) throw new Error("Image upload failed");
  return json.data.url;
}

/* ======================
   Image Carousel for Table
====================== */
function TableImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
        <img
          src={images[currentIndex]?.url}
          alt={`Product ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
          <div className="absolute bottom-1 left-1 right-1 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
          <div className="absolute top-1 right-1 bg-black/70 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.length} images
          </div>
        </>
      )}
    </div>
  );
}

/* ======================
   MAIN COMPONENT - Redesigned
====================== */
export default function ProductEntry() {
  const emptyForm = {
    title: "",
    description: "",
    images: [],
  };

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = (title, message, type = "info") => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4000);
  };

  /* Load products */
  useEffect(() => {
    const q = query(collection(db, "productsdata"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.images.length) return "At least one image is required";
    return "";
  };

  const uploadImages = async () => {
    const result = [];
    for (const img of form.images) {
      if (img.file) {
        result.push({ url: await uploadToImgbb(img.file) });
      } else {
        result.push({ url: img.url });
      }
    }
    return result;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return showToast("Validation Error", err, "error");

    setLoading(true);
    try {
      const images = await uploadImages();
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        images,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, "productsdata", editingId), payload);
        showToast("Success", "Product updated successfully", "success");
      } else {
        await addDoc(collection(db, "productsdata"), {
          ...payload,
          createdAt: serverTimestamp(),
          createdBy: auth.currentUser?.uid,
        });
        showToast("Success", "Product created successfully", "success");
      }

      setForm(emptyForm);
      setEditingId(null);
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      showToast("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title || "",
      description: product.description || "",
      images: (product.images || []).map((img, i) => ({
        id: i,
        file: null,
        url: img.url,
      })),
    });
    setOpen(true);
  };

  const onRemoveImage = (index) => {
    setForm((prev) => {
      const copy = [...prev.images];
      const removed = copy.splice(index, 1)[0];
      if (removed?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(removed.url);
      }
      return { ...prev, images: copy };
    });
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "productsdata", deleteId));
      showToast("Success", "Product deleted successfully", "success");
      setDeleteId(null);
    } catch (error) {
      showToast("Error", "Failed to delete product", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmModal
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={onDelete}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
        <p className="text-gray-600">Manage your product catalog and inventory</p>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">{products.length}</span> products
          </div>
        </div>
        
        <button
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm);
            setOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <tr>
                <th className="text-left p-6 font-semibold text-gray-900">Product</th>
                <th className="text-left p-6 font-semibold text-gray-900">Description</th>
                {/* <th className="text-left p-6 font-semibold text-gray-900">Images</th> */}
                <th className="text-left p-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <TableImageCarousel images={product.images} />
                      <div>
                        <p className="font-medium text-gray-900">{product.title}</p>
                        <p className="text-sm text-gray-500">
                          Updated {product.updatedAt?.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-gray-700 line-clamp-2 max-w-md">
                      {product.description}
                    </p>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {products.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500 text-lg mb-2">No products yet</p>
              <p className="text-gray-400">Add your first product to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[9997] animate-fade-in">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => !loading && setOpen(false)} 
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform animate-scale-in"
            >
              {/* Modal Header */}
              <div className="border-b p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingId ? "Edit Product" : "Add New Product"}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {editingId ? "Update product details" : "Fill in the product information"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => !loading && setOpen(false)}
                    disabled={loading}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter product title"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe your product in detail"
                    disabled={loading}
                  />
                </div>

                <ImageUpload
                  images={form.images}
                  onAdd={(imgs) =>
                    setForm((prev) => ({
                      ...prev,
                      images: [...prev.images, ...imgs].slice(0, 6),
                    }))
                  }
                  onRemove={onRemoveImage}
                />
              </div>

              {/* Modal Footer */}
              <div className="border-t p-6 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {editingId ? "Editing existing product" : "Creating new product"}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => !loading && setOpen(false)}
                      disabled={loading}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading && (
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      )}
                      {loading ? "Saving..." : editingId ? "Update Product" : "Create Product"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}