import { ApiResponse, CreateOrderRequest } from "./types";
import axios from "axios";

const createOrderUrl = "http://localhost:8081/sk-solutions/api/v1/orders";

export const createOrder = (formData: CreateOrderRequest) => {
    const createOrderRequestBody = {
        name: formData.customerName,
        email: formData.customerEmail,
        totalAmount: formData.totalAmount,
        phone: formData.customerPhone,
        orderDescription: formData.orderDescription,
    }

    const response = axios.post(createOrderUrl, createOrderRequestBody, { headers: { "Content-Type": "application/json" } });
    return response as Promise<ApiResponse>;
};
