import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

interface User{
    id:number;
    name : string;
}

interface Film {
    id: number;
    nama_film: string;
}

interface Theater {
    id: number;
    nama_bioskop: string;
    lokasi_bioskop: string;
}

interface Schedule {
    id: number;
    tanggal_tayang: string;
    jam_tayang: string;
    film: Film;
    theater: Theater;
}

interface Pemesanan {
    id: number;
    status_pemesanan:'berhasil' | 'gagal' | 'masalah' | null;
    schedule: Schedule;
    user: User;
    created_at: string;
}

interface Props {
    pemesanan: Pemesanan[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Order List',
        href: '/orderlist',
    },
];

export default function OrderList({pemesanan}:Props) {
    const [selectedStatuses, setSelectedStatuses] = useState<{ [key: number]: string }>({});
    
    function handleStatusChange(pemesananId: number, status: string) {
        setSelectedStatuses(prev => ({
            ...prev,
            [pemesananId]: status
        }));
    }
    
    function handleSubmit(pemesananId: number) {
        const status = selectedStatuses[pemesananId];
        if (!status) {
            alert('Please select a status first');
            return;
        }
        
        router.patch('/orderlist/update', {
            id: pemesananId,
            status_pemesanan: status
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-8">
                    <h1 className='mb-8 font-bold text-3xl'>
                        Pemesanan Ticket
                    </h1>
                    <div>
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Pembeli</TableHead>
                                    <TableHead>Film</TableHead>
                                    <TableHead>Theater</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Jam</TableHead>
                                    <TableHead>Bukti Bayar</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="">Submition</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pemesanan.map(prop => (
                                    <TableRow key={prop.id}>
                                        <TableCell className="font-medium">{prop.id}</TableCell>
                                        <TableCell>{prop.user.name}</TableCell>
                                        <TableCell>{prop.schedule.film.nama_film}</TableCell>
                                        <TableCell>{prop.schedule.theater.nama_bioskop}</TableCell>
                                        <TableCell>{prop.schedule.tanggal_tayang}</TableCell>
                                        <TableCell>{prop.schedule.jam_tayang}</TableCell>
                                        <TableCell>
                                            <img src="" alt="halo" />
                                        </TableCell>
                                        <TableCell>
                                            <Select value={selectedStatuses[prop.id] || prop.status_pemesanan || ''} onValueChange={(value) => handleStatusChange(prop.id, value)}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder={prop.status_pemesanan} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="berhasil" >Success</SelectItem>
                                                    <SelectItem value="gagal" >Fail</SelectItem>
                                                    <SelectItem value="masalah" >Trouble</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="">
                                            <Button onClick={() => handleSubmit(prop.id)}>Submit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


{/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
    </div>
    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
    </div>
    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
    </div>
</div> */}