
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddBookPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    image: "",
    description: "",
    totalCopies: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const newBook = {
      ...formData,
      totalCopies: Number(formData.totalCopies),
      availableCopies: Number(formData.totalCopies),
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Book added successfully!");

        setFormData({
          title: "",
          author: "",
          category: "Fiction",
          image: "",
          description: "",
          totalCopies: 1,
        });

        router.push("/books");
      } else {
        toast.error(data.message || "Failed to add book");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
        <h1 className="mb-3 text-3xl font-bold text-[#234C3D]">
          Add New Book
        </h1>

        <p className="mb-8 text-gray-600">
          Add a new book to the BookNook library.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Book Title */}
          <div>
            <label className="mb-2 block font-medium">
              Book Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#234C3D]"
            />
          </div>

          {/* Author */}
          <div>
            <label className="mb-2 block font-medium">
              Author Name
            </label>

            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#234C3D]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#234C3D]"
            >
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Kids">Kids</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block font-medium">
              Book Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#234C3D]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium">
              Short Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description"
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#234C3D]"
            />
          </div>

          {/* Total Copies */}
          <div>
            <label className="mb-2 block font-medium">
              Total Copies
            </label>

            <input
              type="number"
              name="totalCopies"
              value={formData.totalCopies}
              onChange={handleChange}
              min="1"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#234C3D]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#234C3D] px-6 py-3 font-semibold text-white transition hover:bg-[#18392D] disabled:bg-gray-400"
          >
            {loading ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
