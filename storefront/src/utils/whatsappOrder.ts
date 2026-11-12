import { PAYMENT_METHOD_LABELS, STORE_NAME, whatsappLink } from "@/config/store";

export interface OrderLine {
  name: string;
  size?: string;
  quantity: number;
  price: number;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  items: OrderLine[];
  total: number;
}

/** Validates an Egyptian mobile number (010 / 011 / 012 / 015 + 8 digits) */
export const isValidEgyptianPhone = (phone: string) =>
  /^01[0125][0-9]{8}$/.test(phone.replace(/\s|-/g, ""));

/** Builds a clean, readable WhatsApp order message */
export function buildOrderMessage(order: OrderDetails): string {
  const lines = order.items
    .map((item, i) => {
      const size = item.size ? ` (${item.size})` : "";
      return `${i + 1}. ${item.name}${size}\n   الكمية: ${item.quantity} × ${item.price} = ${item.quantity * item.price} ج.م`;
    })
    .join("\n");

  return [
    `طلب جديد من متجر ${STORE_NAME}`,
    "",
    "بيانات العميل:",
    `الاسم: ${order.fullName}`,
    `الهاتف: ${order.phone}`,
    `المحافظة / المدينة: ${order.city}`,
    `العنوان: ${order.address}`,
    order.notes ? `ملاحظات: ${order.notes}` : null,
    "",
    "المنتجات:",
    lines,
    "",
    `طريقة الدفع: ${PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}`,
    "الشحن: مجاني",
    `الإجمالي: ${order.total} ج.م`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export const buildOrderWhatsappUrl = (order: OrderDetails) => whatsappLink(buildOrderMessage(order));
