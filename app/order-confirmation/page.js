import { Suspense } from "react";
import OrderConfirmationClient from "./OrderConfirmationClient";

export const metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationClient />
    </Suspense>
  );
}
