export const NEST_PORT = 3030;

export const Order = {
    ASC: "ASC",
    DESC: "DESC",
} as const;
export type Order = typeof Order[keyof typeof Order];

export const Pagination = {
    MINIMUM_PAGE_NUMBER: 1,
    MINIMUM_TAKE_TYPE: 3,
    MAXIMUM_TAKE_TYPE: 50,
    DEFAULT_TAKE_TYPE: 5,
} as const;
export type Pagination = keyof typeof Pagination;
