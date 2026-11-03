import { Suspense } from "react";
import BookDetailsPage from "./BookDetailsPage";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

async function BookPageContent({ params }) {
  const { id } = await params;

  const res = await fetch(
    `https://booknook-server-5hv3.onrender.com/books/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const book = await res.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <BookDetailsPage
      book={book}
      user={session?.user || null}
    />
  );
}

export default function BookPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg text-emerald-700" />
        </div>
      }
    >
      <BookPageContent params={params} />
    </Suspense>
  );
}