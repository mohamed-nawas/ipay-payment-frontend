export interface PaymentFormState {
  orderDescription: string;
  totalAmount: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  // Index signature for string properties, can only have properties of type string
  [key: string]: string;
}

export interface CreateOrderRequest {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderDescription: string;
  totalAmount: number;
  // Index signature for string and number properties, can only have properties of type string or number
  [key: string]: string | number;
}

export interface CreateOrderResponseData {
  orderId: string;
  orderDescription: string;
  merchantWebToken: string;
  returnUrl: string;
  cancelUrl: string;
  // Index signature for string properties, can only have properties of type string
  [key: string]: string;
}

interface CreateOrderResponse {
  status: string;
  message: string;
  data: CreateOrderResponseData;
  displayMessage: string;
  statusCode: number;
}

export interface ApiResponse {
  data: CreateOrderResponse;
  status: number;
}
