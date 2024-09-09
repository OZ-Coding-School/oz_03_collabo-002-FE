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
};

export type OrderList = {
  total_count: number;
  total_pages: number;
  current_page: number;
  results: Order[];
};

type OrderLink = [
  {
    href: string;
    rel: string; // self | approve | update | capture
    method: string; // GET | PATCH | POST
  },
];
export type CreateOrderActions = {
  id: string;
  status: string; //'CREATED'
  links: OrderLink;
};

type CaptureData = {
  id: string;
  status: string;
  payment_source: {
    paypal: CaptureResponse;
  };
  links: OrderLink;
};

// Zustand 스토어의 상태와 액션을 정의
export type OrderStore = {
  orderData: CreateOrderActions | null;
  captureData: CaptureData | null;
  payments: OrderList | null;
  loading: boolean;
  error: string | null;
  fetchPayments: () => Promise<void>;
  // createPayPalOrder: (amount: string) => Promise<void>;
  // capturePayPalOrder: (
  //   orderId: string,
  //   captureData: {
  //     class_id: number;
  //     options: string;
  //     class_date_id: number;
  //     quantity: number;
  //     referral_code?: string;
  //   },
  // ) => Promise<void>;
  validateReferralCode: (code: string) => Promise<void>;
  refundPayment: (paymentId: number) => Promise<void>;
};

export type CaptureResponse = {
  id: string;
  intent: string;
  status: string;
  purchase_units: [
    {
      reference_id: string;
      amount: {
        currency_code: string;
        value: string;
      };
      payee: {
        email_address: string;
        merchant_id: string;
        display_data: {
          brand_name: string;
        };
      };
      description: string;
      soft_descriptor: string;
      payments: {
        captures: [
          {
            id: string;
            status: string;
            amount: {
              currency_code: string;
              value: string;
            };
            final_capture: true;
            seller_protection: {
              status: string;
              dispute_categories: string[];
            };
            seller_receivable_breakdown: {
              gross_amount: {
                currency_code: string;
                value: string;
              };
              paypal_fee: {
                currency_code: string;
                value: string;
              };
              net_amount: {
                currency_code: string;
                value: string;
              };
            };
            links: OrderLink
            create_time: string;
            update_time: string;
          },
        ];
      };
    },
  ];
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
    payer_id: string;
    address: {
      country_code: string;
    };
  };
  create_time: string;
  update_time: string;
  links: OrderLink
};
