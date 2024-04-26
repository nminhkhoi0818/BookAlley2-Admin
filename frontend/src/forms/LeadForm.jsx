import React from "react";
import { Form, Input } from "antd";
import { DatePicker } from "@/components/CustomAntd";

export default function LeadForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Shipping Method"
        name="shipping_method"
        rules={[
          {
            required: true,
            message: 'Please input shipping method!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Payment Method"
        name="payment_method"
        rules={[
          {
            required: true,
            message: 'Please input payment method!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Total"
        name="total"
        rules={[
          {
            required: true,
            message: 'Please input total!'
          }
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
