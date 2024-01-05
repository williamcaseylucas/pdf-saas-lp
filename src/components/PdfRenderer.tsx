"use client";

import { Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector"; // named import

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// From /app/dashboard/[fileId]

interface PdfRenderProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRenderProps) => {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      {/* PDF options box */}
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        {/* Contents */}
        <div className="flex items-center gap-1.5">Top bar</div>
      </div>
      {/* Will stretch the remainder of the container */}
      <div className="flex-1 w-full max-h-screen">
        <div ref={ref}>
          <Document
            file={url}
            className="max-h-full"
            loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 h-6 w-6 animate-spin" />
              </div>
            }
            onLoadError={() =>
              toast({
                title: "Error loading pdf",
                description: "Something went wrong",
                variant: "destructive",
              })
            }
          >
            <Page pageNumber={1} width={width ? width : 1} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
