export interface UserInfo {
    username: string;
    empno: string;
    department: string;
    use_permission: string;
    sec: string;
    msect_id: string;
}

declare module '@inertiajs/core' {
    interface PageProps {
        userInfo: UserInfo | null;
    }
}