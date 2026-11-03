
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const API_URL = "https://booknook-server-5hv3.onrender.com";

export default function EditBookPage({ id }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    coverImage: "",
    totalCopies: "",
    availableCopies: "",
  });

  // Fetch Book Details
  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/books/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load book");
        }

        const data = await res.json();
        const book = data.book || data;

        setFormData({
          title: book.title || "",
          author: book.author || "",
          category: book.category || "",
          coverImage: book.coverImage || "",
          totalCopies: book.totalCopies ?? "",
          availableCopies: book.availableCopies ?? "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Book
  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalCopies = Number(formData.totalCopies);
    const availableCopies = Number(formData.availableCopies);

    if (
      !Number.isInteger(totalCopies) ||
      !Number.isInteger(availableCopies) ||
      totalCopies < 0 ||
      availableCopies < 0
    ) {
      return toast.error("Please enter valid copy numbers");
    }

    if (availableCopies > totalCopies) {
      return toast.error(
        "Available copies cannot exceed total copies"
      );
    }

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.category.trim()
    ) {
      return toast.error("Please fill in all required fields");
    }

    try {
      setUpdating(true);

      const updatedBook = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category.trim(),
        coverImage: formData.coverImage.trim(),
        totalCopies,
        availableCopies,
      };

      const res = await fetch(`${API_URL}/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      if (!res.ok) {
        throw new Error("Failed to update book");
      }

      toast.success("Book updated successfully!");

      setTimeout(() => {
        router.replace("/my-books");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book");
    } finally {
      setUpdating(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6F0] dark:bg-[#0D1110]">
        <span className="loading loading-spinner loading-lg text-emerald-700 dark:text-emerald-400" />
      </div>
    );
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F8F6F0] px-4 py-12 dark:bg-[#0D1110] sm:px-6 lg:px-8">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-72 w-72 rounded-full bg-lime-500/10 blur-3xl" />

      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Personal Library
          </span>

          <h1 className="mt-4 text-3xl font-extrabold text-[#18392D] dark:text-white sm:text-4xl">
            Edit <span className="text-emerald-600 dark:text-emerald-400">Book</span>
          </h1>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Update your book information and manage its copies.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-gray-200 bg-white/90 p-5 shadow-lg shadow-emerald-900/5 backdrop-blur-sm dark:border-gray-700 dark:bg-[#171D1B] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Book Cover Preview */}
            {formData.coverImage && (
              <div className="flex justify-center">
                <div className="relative h-48 w-36 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                  <Image
                    src={formData.coverImage}
                    alt={formData.title || "Book cover"}
                    fill
                    sizes="144px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            )}

            {/* Book Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Book Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-600 dark:bg-[#0D1110] dark:text-white"
              />
            </div>

            {/* Author */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Author Name *
              </label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-600 dark:bg-[#0D1110] dark:text-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Category *
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter book category"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-600 dark:bg-[#0D1110] dark:text-white"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Cover Image URL
              </label>

              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="Enter cover image URL"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-600 dark:bg-[#0D1110] dark:text-white"
              />
            </div>

            {/* Copies */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Total Copies *
                </label>

                <input
                  type="number"
                  name="totalCopies"
                  min="0"
                  step="1"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-600 dark:bg-[#0D1110] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Available Copies *
                </label>

                <input
                  type="number"
                  name="availableCopies"
                  min="0"
                  step="1"
                  value={formData.availableCopies}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-600 dark:bg-[#0D1110] dark:text-white"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 dark:border-gray-700 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={updating}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-[#252D29]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="rounded-xl bg-[#234C3D] px-7 py-3 font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-[#19392D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updating ? "Updating..." : "Update Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
