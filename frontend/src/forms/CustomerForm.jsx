import React from "react";
import { Button, Form, Input } from "antd";

export default function CustomerForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input username!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: 'Please input role!'
          }
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
