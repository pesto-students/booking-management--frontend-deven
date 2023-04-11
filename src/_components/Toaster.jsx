import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

// https://www.npmjs.com/package/react-toastify
export default function Toaster(props) {
  const toast = useRef(null);

  useEffect(() => {
    const object = {
      severity: "info",
      summary: "Info",
      detail: "Message Content",
    };

    if (props.message) {
      object.detail = props.message;
    }

    if (props.error) {
      object.severity = "error";
      object.summary = "Error";
    }

    if (props.success) {
      object.severity = "success";
      object.summary = "Success";
    }

    toast.current.show(object);
  }, []);

  return <Toast ref={toast} />;
}
