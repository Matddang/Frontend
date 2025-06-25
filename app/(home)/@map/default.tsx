import React, { Suspense } from "react";
import Map from "./_components/Map";

export default function Default() {
  return (
    <Suspense>
      <Map />
    </Suspense>
  );
}
