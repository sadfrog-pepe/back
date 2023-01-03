export const NEST_PORT = 3030;

export const Order = {
    ASC: "Ascending",
    DESC: "Descending",
} as const;
export type Order = typeof Order[keyof typeof Order];

export const PaginationTakeType = {
    TEN: 10,
    FIFTEEN: 15,
    TWENTY: 20,
    TWENTY_FIVE: 25,
    THIRTHY: 30,
} as const;
export type PaginationTakeType =
    typeof PaginationTakeType[keyof typeof PaginationTakeType];

export const Pagination = {
    MINIMUM_PAGE_NUMBER: 1,
    MINIMUM_TAKE_TYPE: PaginationTakeType.TEN,
    MAXIMUM_TAKE_TYPE: PaginationTakeType.THIRTHY,
    DEFAULT_TAKE_TYPE: PaginationTakeType.TEN,
} as const;
export type Pagination = keyof typeof Pagination;
