
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  BookOpen,
  User,
  Tag,
  Image as ImageIcon,
  FileText,
  Library,
  Plus,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const categories = [
  "Fiction",
  "Self-Help",
  "Finance",
  "Classic",
  "Fantasy",
  "Science",
  "History",
  "Technology",
  "Biography",
  "Kids",
  "Others",
];

export default function AddBookPage() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    coverImage: "",
    totalCopies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "coverImage") {
      setImageError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login before adding a book.");
      router.push("/login");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.category ||
      !formData.description.trim() ||
      !formData.coverImage.trim() ||
      !formData.totalCopies
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const totalCopies = Number(formData.totalCopies);

    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    try {
      setLoading(true);

 const bookData = {
  title: formData.title.trim(),
  author: formData.author.trim(),
  category: formData.category,
  description: formData.description.trim(),
  coverImage: formData.coverImage.trim(),
  totalCopies,
  availableCopies: totalCopies,
  addedBy: session.user.email,
  createdAt: new Date().toISOString(),
};
      const res = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add book.");
      }

      toast.success("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        coverImage: "",
        totalCopies: "",
      });

      router.push("/books");
      router.refresh();
    } catch (error) {
      console.error("Add book error:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#234C3D]/15 bg-white px-4 py-3 text-sm text-[#234C3D] outline-none transition focus:border-[#234C3D] focus:ring-2 focus:ring-[#234C3D]/10 dark:border-white/10 dark:bg-[#171D1B] dark:text-white dark:focus:border-emerald-500";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#234C3D] dark:text-gray-200";

  return (
    <main className="min-h-screen bg-[#F8F6F0] px-4 py-12 text-[#234C3D] dark:bg-[#0D1110] dark:text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/books"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#234C3D]/70 transition hover:text-[#234C3D] dark:text-gray-400 dark:hover:text-emerald-400"
          >
            <ArrowLeft size={17} />
            Back to Books
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#234C3D] p-3 text-white dark:bg-emerald-600">
              <BookOpen size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                Add New Book
              </h1>
              <p className="mt-1 text-sm text-[#234C3D]/60 dark:text-gray-400">
                Add a new book to your BookNook library.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#234C3D]/10 bg-white p-6 shadow-sm md:p-8 dark:border-white/10 dark:bg-[#171D1B]"
          >
            <div className="mb-7">
              <h2 className="text-xl font-bold">Book Information</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter the details of your book.
              </p>
            </div>

            {/* Title */}
            <div className="mb-5">
              <label className={labelClass}>
                <span className="inline-flex items-center gap-2">
                  <BookOpen size={16} />
                  Book Title
                </span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className={inputClass}
                required
              />
            </div>

            {/* Author */}
            <div className="mb-5">
              <label className={labelClass}>
                <span className="inline-flex items-center gap-2">
                  <User size={16} />
                  Author Name
                </span>
              </label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className={inputClass}
                required
              />
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className={labelClass}>
                <span className="inline-flex items-center gap-2">
                  <Tag size={16} />
                  Category
                </span>
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select a category</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div className="mb-5">
              <label className={labelClass}>
                <span className="inline-flex items-center gap-2">
                  <ImageIcon size={16} />
                  Cover Image URL
                </span>
              </label>

              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/book-cover.jpg"
                className={inputClass}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className={labelClass}>
                <span className="inline-flex items-center gap-2">
                  <FileText size={16} />
                  Description
                </span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description..."
                rows={5}
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            {/* Copies */}
            <div className="mb-7">
              <label className={labelClass}>
                <span className="inline-flex items-center gap-2">
                  <Library size={16} />
                  Total Copies
                </span>
              </label>

              <input
                type="number"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                placeholder="Enter total copies"
                min="1"
                step="1"
                className={inputClass}
                required
              />

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Available copies will automatically match total copies.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#234C3D] px-6 py-3.5 font-semibold text-white transition hover:bg-[#18392D] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-700"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Adding Book...
                </>
              ) : (
                <>
                  <Plus size={19} />
                  Add Book
                </>
              )}
            </button>
          </form>

          {/* Preview */}
          <aside className="h-fit rounded-3xl border border-[#234C3D]/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#171D1B]">
            <h2 className="mb-5 text-lg font-bold">Book Preview</h2>

            <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-[#F8F6F0] dark:bg-[#0D1110]">
              {formData.coverImage && !imageError ? (
                <img
                  src={formData.coverImage}
                  alt="Book cover preview"
                  className="h-72 w-full object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-[#234C3D]/40 dark:text-gray-500">
                  <BookOpen size={60} strokeWidth={1.2} />
                  <span className="text-sm">
                    {imageError ? "Invalid image URL" : "No cover image"}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 space-y-3">
              <h3 className="text-xl font-bold">
                {formData.title || "Book Title"}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                By {formData.author || "Author Name"}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {formData.category && (
                  <span className="rounded-full bg-[#234C3D]/10 px-3 py-1 text-xs font-semibold text-[#234C3D] dark:bg-emerald-500/15 dark:text-emerald-400">
                    {formData.category}
                  </span>
                )}

                {formData.totalCopies && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300">
                    {formData.totalCopies} Copies
                  </span>
                )}
              </div>

              <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                {formData.description || "Book description will appear here."}
              </p>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
