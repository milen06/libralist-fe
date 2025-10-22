import { Suspense } from "react";
import CollectionsPage from "./_components/CollectionsPage";

export default function CollectionsWrapperPage() {
  return (
    <Suspense fallback={<div></div>}>
      <CollectionsPage />
    </Suspense>
  );
}