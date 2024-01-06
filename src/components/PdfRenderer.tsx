"use client";

import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector"; // named import
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// From /app/dashboard/[fileId]

interface PdfRenderProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRenderProps) => {
  // for back slash
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      {/* PDF options box */}
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        {/* Contents */}
        <div className="flex items-center gap-1.5">
          <Button
            disabled={currPage <= 1} // Don't let the button get clicked when you're on page 1
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
            }}
            variant="ghost"
            aria-label="previous page"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          {/* Page number identifier */}
          <div className="flex items-center gap-1.5">
            <Input className="w-12 h-8" />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              {/* while loading it will show an 'x' */}
              <span>{numPages ?? "x"}</span>
            </p>
          </div>

          <Button
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1
              );
            }}
            variant="ghost"
            aria-label="next page"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Will stretch the remainder of the container */}
      <div className="flex-1 w-full max-h-screen">
        <div ref={ref}>
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}
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
            <Page pageNumber={currPage} width={width ? width : 1} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
