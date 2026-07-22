import OrderConfirmationClient from "./OrderConfirmationClient";

export const metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationClient />;
}
