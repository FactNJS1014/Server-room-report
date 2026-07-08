export interface TimeRecord {
    emp_id: string;
    inout: string;
    datetime: string;
    remark: string | null;
    first_name: string | null;
    last_name: string | null;
    time_id: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

export interface Filters {
    search: string | null;
    per_page: number;
    sort: string;
    direction: 'asc' | 'desc';
}


