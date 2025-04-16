import { useState } from 'react';

interface UsePaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

export const usePagination = ({
  totalPages,
  initialPage = 1,
  onPageChange
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const getPageNumbers = (): number[] => {
    // Logic to create an array of page numbers to display
    // Can be customized based on your pagination design
    const delta = 2; // Number of pages to show before and after current page
    const range: number[] = [];
    
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    
    // Add first page if not included
    if (range[0] > 1) {
      range.unshift(1);
      // Add ellipsis if needed
      if (range[1] > 2) {
        range.splice(1, 0, -1); // -1 represents ellipsis
      }
    }
    
    // Add last page if not included
    if (range[range.length - 1] < totalPages) {
      // Add ellipsis if needed
      if (range[range.length - 1] < totalPages - 1) {
        range.push(-1); // -1 represents ellipsis
      }
      range.push(totalPages);
    }
    
    return range;
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    getPageNumbers,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};