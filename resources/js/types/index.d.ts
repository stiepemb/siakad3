import { Config } from 'ziggy-js';

export interface User {
    level_id: number;
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar?: File | string | undefined;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
