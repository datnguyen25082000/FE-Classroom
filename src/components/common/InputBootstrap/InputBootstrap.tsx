import React from "react";
import { Form } from "react-bootstrap";

interface IInputBootstrap {
  name?: string;
  value?: string;
  type?: string;
  label?: string;
  handleOnChange?: any;
  err?: string;
  placeholder?: string;
}

export const InputBootstrap: React.FC<IInputBootstrap> = ({
  name,
  value,
  type = "text",
  label,
  handleOnChange,
  err,
  placeholder,
}) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        defaultValue={value}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
      <Form.Text className="text-muted">{err}</Form.Text>
    </Form.Group>
  );
};
