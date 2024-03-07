"use client";
import { useState } from "react";
import PDFUpload from "@/components/pdf-uploader";
const Page = () => {
  const [PDF, setPDF] = useState(null);
  return (
    <div>
      <PDFUpload setPDF={setPDF} />
      {PDF && (
        <div>
          <p>PDF Uploaded</p>
          <a href={PDF} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
