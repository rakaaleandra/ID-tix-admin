import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

interface User{
    id:number;
    name : string;
    email : string;
    created_at : string;
    email_verified_at : string;

}

interface Props{
    users : User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User List',
        href: '/userlist',
    },
];

export default function UserList({users}:Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-8">
                    <h1 className='mb-8 font-bold text-3xl'>
                        User List
                    </h1>
                    <div>
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Email Verified At</TableHead>
                                    <TableHead>Update</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.created_at}</TableCell>
                                        <TableCell>{user.email_verified_at}</TableCell>
                                        <TableCell>
                                            <Button className='transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-white hover:bg-orange-600'>Update</Button>
                                        </TableCell>
                                        <TableCell className="">
                                            <Button variant="destructive">
                                                <Link href={route("userlist.destroy", user.id)}>
                                                    Delete
                                                </Link>
                                            </Button>
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

