import { Document, Page } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// From /app/dashboard/[fileId]

interface PdfRenderProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRenderProps) => {
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col  items-center">
      {/* PDF options box */}
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        {/* Contents */}
        <div className="flex items-center gap-1.5">Top bar</div>
      </div>
      {/* Will stretch the remainder of the container */}
      <div className="flex-1 w-full max-h-screen">
        <div>
          <Document file={url} className="max-h-full">
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
