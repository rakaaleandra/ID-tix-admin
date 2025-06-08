import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';
import Logo from '@/assets/Logo4.svg';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Head>
            <title>Admin ID-tix</title>
            <link rel='icon' href={Logo} />
        </Head>
        {children}
    </AppLayoutTemplate>
);
