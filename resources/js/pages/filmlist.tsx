import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Film{
    id : number;
    nama_film : string;
}

interface Props{
    films : Film[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Film List',
        href: '/filmlist',
    },
];

export default function Dashboard({films}:Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Film List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div> */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-8">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <h1 className='mb-8 font-bold text-3xl'>
                        Pemesanan Ticket
                    </h1>
                    <div>
                        { films.map((film) => (
                            <h1>{film.nama_film}</h1>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
