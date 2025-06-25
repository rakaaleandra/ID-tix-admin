import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, User, Ticket, Film, ScanQrCode } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className='w-full h-full flex items-center justify-center text-4xl font-semibold text-neutral-900 dark:text-neutral-100'>
                        Welcome to Admin
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href='orderlist'>
                            <div className='w-full h-full flex flex-col items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200'>
                                <Ticket />
                                <h1 className='text-2xl font-semibold'>List Order</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href='userlist'>
                            <div className='w-full h-full flex flex-col items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200'>
                                <User />
                                <h1 className='text-2xl font-semibold'>List User</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href='filmlist'>
                            <div className='w-full h-full flex flex-col items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200'>
                                <Film />
                                <h1 className='text-2xl font-semibold'>List Film</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Link href='qrscan'>
                            <div className='w-full h-full flex flex-col items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200'>
                                <ScanQrCode />
                                <h1 className='text-2xl font-semibold'>QR Scanner</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
