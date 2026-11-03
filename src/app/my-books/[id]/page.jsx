import { Suspense } from "react";
import EditBookPage from "./EditBookPage";

async function EditBookContent({ params }) {
  const { id } = await params;

  return <EditBookPage id={id} />;
}

export default function Page({ params }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg text-emerald-700" />
        </div>
      }
    >
      <EditBookContent params={params} />
    </Suspense>
  );
}