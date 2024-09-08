export type Order = {
  id: number;
  class_title: string;
  class_date_info: string;
  created_at: string;
  updated_at: string;
  order_id: string;
  status: string;
  amount: string;
  refunded_amount: string;
  currency: string;
  capture_id: string;
  Order_method: string;
  payer_email: string;
  user_id: number;
  class_id: number;
  options: string;
  class_date_id: number;
  quantity: number;
  referral_code: string;
  transaction_id: string;
}

export type OrderList = {
  total_count: number;
  total_pages: number;
  current_page: number;
  results: Order[];
}

// Zustand 스토어의 상태와 액션을 정의
export type OrderStore = {
  payments: OrderList | null;
  loading: boolean;
  error: string | null;
  fetchPayments: () => Promise<void>;
  createPayment: (paymentData: {
    class_id: number;
    options: string;
    class_date_id: number;
    quantity: number;
    referral_code?: string;
  }) => Promise<void>;
  createPayPalOrder: (amount: string) => Promise<void>;
  capturePayPalOrder: (orderId: string, captureData: {
    class_id: number;
    options: string;
    class_date_id: number;
    quantity: number;
    referral_code?: string;
  }) => Promise<void>;
  validateReferralCode: (code: string) => Promise<void>;
  refundPayment: (paymentId: number) => Promise<void>;
}
