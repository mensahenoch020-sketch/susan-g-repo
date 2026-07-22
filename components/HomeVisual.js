"use client";

import { useState } from "react";
import Image from "next/image";
import FoodVisual from "@/components/FoodVisual";

export default function HomeVisual({ variant, image, alt, label }) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return <FoodVisual variant={variant} label={label} />;
  }

  return (
    <div className="food-visual-photo">
      <Image
        src={image}
        alt={alt || label}
        fill
        style={{ objectFit: "cover" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
