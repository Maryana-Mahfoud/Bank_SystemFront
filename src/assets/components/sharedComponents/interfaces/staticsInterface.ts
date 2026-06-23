export interface RecentUser {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface MonthlyEntry {
    month: number;
    year: number;
    total: number;
}

export interface Statistics {
    total_users: number;
    total_customers: number;
    total_employees: number;
    total_transactions: number;
    active_customers: number;
    unactive_customers: number;
    monthly_transactions: MonthlyEntry[];
    monthly_registrations: MonthlyEntry[];
    recent_users: RecentUser[];
    system_summary: {
        total_registered: number;
        [key: string]: number;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: string | null;
    created_at: string;
    deleted_at: string | null;
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}