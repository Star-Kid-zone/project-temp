import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodePreview = ({ url }) => {
  if (!url) return <p>No URL provided</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>QR Code Preview</h2>
      <QRCodeCanvas value={url} size={200} />
      <p>{url}</p>
    </div>
  );
};

export default QRCodePreview;
