import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps {
  size: number;
  page: number;
  total_pages?: number;
  handleSizeChange: (value: string) => void;
  handlePageChange: (value?: string) => void;
}

export function DataTablePagination({
  size,
  page,
  total_pages,
  handleSizeChange,
  handlePageChange,
}: DataTablePaginationProps) {
  const pageSizeOptions = [10, 20, 30, 40, 50];

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 mt-2 sm:flex-row sm:gap-8">
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Qatorlar soni</p>
          <Select value={size.toString()} onValueChange={handleSizeChange}>
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={"Number"} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => handlePageChange("1")}
            disabled={page === 1}
          >
            <ChevronsLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(`${Number(page) - 1}`)}
            disabled={Number(page) <= 1}
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(`${Number(page) + 1}`)}
            disabled={Number(page) >= Number(total_pages)}
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => handlePageChange(total_pages?.toString())}
            disabled={Number(page) >= Number(total_pages)}
          >
            <ChevronsRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
