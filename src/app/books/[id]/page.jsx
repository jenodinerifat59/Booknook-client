
const BookDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-10">Book not found!</div>;
  }

  const book = await res.json();

  return (
    <div className="min-h-screen bg-[#F8F6F0] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div>
            <img
              src={book.image}
              alt={book.title}
              className="h-[400px] w-full rounded-xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="mb-3 w-fit rounded-full bg-green-100 px-4 py-1 text-sm text-green-700">
              {book.category}
            </span>

            <h1 className="mb-4 text-3xl font-bold text-[#234C3D]">
              {book.title}
            </h1>

            <p className="mb-2 text-gray-600">
              Author: {book.author}
            </p>

            <p className="mb-2 text-gray-600">
              Added By: {book.addedBy?.name}
            </p>

            <p className="mb-4 text-gray-600">
              Available Copies: {book.availableCopies}
            </p>

            <p className="mb-6 leading-7 text-gray-700">
              {book.description}
            </p>

            <button
              disabled={book.availableCopies === 0}
              className="rounded-lg bg-[#234C3D] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {book.availableCopies === 0
                ? "Not Available"
                : "Borrow This Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
