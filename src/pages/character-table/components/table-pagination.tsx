import { useSearchParams } from 'react-router';

import type { PaginationInfoFragment } from '@/__generated__/types';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
    pagination: PaginationInfoFragment | null | undefined;
}

export function TablePagination({ pagination }: Props) {
    const [searchParams] = useSearchParams();

    if (!pagination) {
        return (
            <div className="mx-auto flex w-full justify-center">
                <div className="flex flex-row items-center gap-1">
                    <Skeleton className="h-10 w-20 rounded-md" />
                    <Skeleton className="h-10 w-20 rounded-md" />
                </div>
            </div>
        );
    }

    const getPageLink = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', String(page));
        return `/?${newParams.toString()}`;
    };

    const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {/* TODO: look into moving disabled code into a variant of the PaginationLink */}
                    <PaginationPrevious
                        className={
                            !pagination.prev
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                        }
                        aria-disabled={!pagination.prev}
                        to={
                            pagination.prev ? getPageLink(pagination.prev) : '#'
                        }
                        onClick={goToTop}
                    />
                </PaginationItem>

                {/* TODO: finish page buttons */}
                {/* {new Array(3).fill(null).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            isActive={page === index + 1}
                            to={getPageLink(index + 1)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {totalPages && page < totalPages - 2 && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink to={getPageLink(totalPages)}>
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )} */}

                <PaginationItem>
                    <PaginationNext
                        className={
                            !pagination.next
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                        }
                        aria-disabled={!pagination.next}
                        to={
                            pagination.next ? getPageLink(pagination.next) : '#'
                        }
                        onClick={goToTop}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
