import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';

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
    status_pemesanan:'berhasil' | 'gagal' | 'masalah' | null | "null" | 'kadaluarsa';
    bukti_bayar: string;
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
    const [feedbacks, setFeedback] = useState<{ [key: number]: string }>({});
    const [statusFilter, setStatusFilter] = useState<string>('semua');
    
    function handleStatusChange(pemesananId: number, status: string) {
        setSelectedStatuses(prev => ({
            ...prev,
            [pemesananId]: status
        }));
    }
    function handleFeedbackChange(pemesananId: number, feedback: string) {
        setFeedback(prev => ({
            ...prev,
            [pemesananId]: feedback
        }));
    }

    const [searchUser, setSearchUser] = useState<string>('');
    const [searchFilm, setSearchFilm] = useState<string>('');
    
    function handleSubmit(pemesananId: number) {
        const status = selectedStatuses[pemesananId];
        const feedback = feedbacks[pemesananId];
        if (!status) {
            alert('Please select a status first');
            return;
        }
        
        router.patch('/orderlist/update', {
            id: pemesananId,
            status_pemesanan: status,
            feedback: feedback
        });
    }

    // const filteredPemesanan = pemesanan.filter((p) => {
    //     if (statusFilter === 'semua') return true;
    //     if (statusFilter === 'null') return p.status_pemesanan === "null";
    //     return p.status_pemesanan === statusFilter;
    // });
    const filteredPemesanan = pemesanan.filter((p) => {
        const matchesStatus = statusFilter === 'semua' ? true : (
            statusFilter === 'null' ? p.status_pemesanan === "null" : p.status_pemesanan === statusFilter
        );

        const matchesUser = p.user.name.toLowerCase().includes(searchUser.toLowerCase());
        const matchesFilm = p.schedule.film.nama_film.toLowerCase().includes(searchFilm.toLowerCase());

        return matchesStatus && matchesUser && matchesFilm;
    });

    function buttonHandle(pemesananId: number){
        const status = selectedStatuses[pemesananId];
        const current = pemesanan.find(p => p.id === pemesananId);
        if (!current) return null;
        let buttonClass = '';
        let buttonVariant = '';

        if (current.status_pemesanan === "null") {
            buttonClass = 'bg-orange-600';
        } else if (current.status_pemesanan === 'berhasil') {
            buttonClass = 'border-white text-white bg-black';
        }

        if(status === 'gagal' || status === 'masalah'){
            return(
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default">Submit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Feedback</DialogTitle>
                            <DialogDescription>
                            Feedback ini bertujuan memberikan ulasan mengapa pemesanannya gagal atau bermasalah.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="feedback">Feedback</Label>
                                <Input id="feedback" name="name"
                                    value={feedbacks[pemesananId] || ''}
                                    onChange={(e) => handleFeedbackChange(pemesananId, e.target.value)} 
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                {/* <Button variant="outline">Cancel</Button> */}
                                <Button onClick={() => handleSubmit(pemesananId)}>Submit</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        } else {
            if(current.status_pemesanan === 'kadaluarsa'){
                return (
                    <Button
                        disabled
                        variant="outline"
                        className="bg-gray-500 text-white cursor-not-allowed"
                    >
                        Expired
                    </Button>
                )
            } else {
                return(
                    <Button
                        onClick={() => handleSubmit(pemesananId)}
                        // className={current.status_pemesanan === null ? 'bg-orange-600' : ''}
                        variant={current.status_pemesanan === 'berhasil' ||
                            current.status_pemesanan === 'gagal' ||
                            current.status_pemesanan === 'masalah'
                            ? 'outline' : 'default'}
                    >
                        Submit
                    </Button>
                )
            }
        }
        // return false
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-8">
                    <h1 className='mb-8 font-bold text-3xl'>
                        Pemesanan Ticket
                    </h1>
                    <div className="mb-4 flex items-center gap-4">
                        <Label>Status Filter:</Label>
                        <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="semua">Semua</SelectItem>
                                <SelectItem value="null">Unverified</SelectItem>
                                <SelectItem value="berhasil">Success</SelectItem>
                                <SelectItem value="gagal">Fail</SelectItem>
                                <SelectItem value="masalah">Problem</SelectItem>
                                <SelectItem value="kadaluarsa">Expired</SelectItem>
                            </SelectContent>
                        </Select>
                            <Label>Cari Nama Pembeli:</Label>
                            <Input
                                type="text"
                                placeholder="Cari nama pembeli..."
                                value={searchUser}
                                onChange={(e) => setSearchUser(e.target.value)}
                                className="w-[200px]"
                            />
                            <Label>Cari Nama Film:</Label>
                            <Input
                                type="text"
                                placeholder="Cari nama film..."
                                value={searchFilm}
                                onChange={(e) => setSearchFilm(e.target.value)}
                                className="w-[200px]"
                            />
                        {/* <div className="mb-4 flex items-center gap-4">
                        </div> */}
                    </div>
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
                                {filteredPemesanan
                                // .filter(p => !statusFilter || p.status_pemesanan === statusFilter)
                                .map(prop => (
                                    <TableRow key={prop.id}>
                                        <TableCell className="font-medium">{prop.id}</TableCell>
                                        <TableCell>{prop.user.name}</TableCell>
                                        <TableCell>{prop.schedule.film.nama_film}</TableCell>
                                        <TableCell>{prop.schedule.theater.nama_bioskop}</TableCell>
                                        <TableCell>{prop.schedule.tanggal_tayang}</TableCell>
                                        <TableCell>{prop.schedule.jam_tayang}</TableCell>
                                        <TableCell>
                                            {/* <img src={`/external-images/${prop.bukti_bayar}`} alt={prop.bukti_bayar} className="w-16 h-16 object-cover cursor-pointer"/> */}
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline">Detail Bukti Bayar</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className='w-8xl'>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>{prop.schedule.film.nama_film} {prop.schedule.tanggal_tayang} {prop.schedule.jam_tayang}</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        {/* This action cannot be undone. This will permanently delete your
                                                        account and remove your data from our servers. */}
                                                        <img src={`/external-images/${prop.bukti_bayar}`} alt={prop.bukti_bayar} className="h-full"/>
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                                                    <AlertDialogAction>Lanjut</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
                                                    <SelectItem className='hidden' value="kadaluarsa" >Expired</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="">
                                            {buttonHandle(prop.id)}
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