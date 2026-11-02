
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyBorrowsPage = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: Better Auth থেকে logged-in user-এর email নেবে
  const userEmail = "user@email.com";

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/borrows?email=${userEmail}`
        );

        const data = await res.json();

        setBorrows(data);
      } catch (error) {
        toast.error("Failed to load borrowed books");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [userEmail]);

  const handleReturn = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/borrows/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setBorrows((prev) =>
          prev.filter((borrow) => borrow._id !== id)
        );

        toast.success("Book returned successfully!");
      } else {
        toast.error(data.message || "Failed to return book");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-bold text-[#234C3D]">
          My Borrows
        </h1>

        <p className="mb-8 text-gray-600">
          Manage the books you have borrowed from BookNook.
        </p>

        {borrows.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center">
            <h2 className="text-xl font-semibold">
              No borrowed books
            </h2>

            <p className="mt-2 text-gray-600">
              You haven't borrowed any books yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[700px]">
              <thead className="bg-[#234C3D] text-white">
                <tr>
                  <th className="p-4 text-left">Book</th>
                  <th className="p-4 text-left">Borrow Date</th>
                  <th className="p-4 text-left">Return Date</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {borrows.map((borrow) => (
                  <tr
                    key={borrow._id}
                    className="border-b border-gray-200"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={borrow.bookImage}
                          alt={borrow.bookTitle}
                          className="h-16 w-12 rounded object-cover"
                        />

                        <span className="font-semibold">
                          {borrow.bookTitle}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      {new Date(
                        borrow.borrowDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      {new Date(
                        borrow.returnDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        className="rounded-lg bg-[#234C3D] px-5 py-2 text-white transition hover:bg-[#18392D]"
                      >
                        Return Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBorrowsPage;
