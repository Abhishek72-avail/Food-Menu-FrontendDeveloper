import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const visiblePages = pages.filter(page => {
    if (totalPages <= 7) return true;
    if (page === 1 || page === totalPages) return true;
    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
    return false;
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {visiblePages.map((page, index) => {
        const prevPage = visiblePages[index - 1];
        if (prevPage && page - prevPage > 1) {
          return (
            <React.Fragment key={page}>
              <span className="px-2">...</span>
              <button
                onClick={() => onPageChange(page)}
                className={cn(
                  "h-10 w-10 rounded-lg",
                  currentPage === page
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-100"
                )}
              >
                {page}
              </button>
            </React.Fragment>
          );
        }
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "h-10 w-10 rounded-lg",
              currentPage === page
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-100"
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}