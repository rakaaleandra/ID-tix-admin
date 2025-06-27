import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
// import { useForm } from 'react-hook-form';
import React, { useState, FormEventHandler } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';


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

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function UserList({users}:Props) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('userlist.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const [search, setSearch] = useState('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-8">
                    <h1 className='mb-8 font-bold text-3xl'>
                        User List
                    </h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className='mb-4'>Create User</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={submit}>
                                <DialogHeader>
                                    <DialogTitle>Create User</DialogTitle>
                                    <DialogDescription>
                                    Creating User
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Full name"
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            disabled={processing}
                                            placeholder="Password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="password_confirmation">Confirm password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            disabled={processing}
                                            placeholder="Confirm password"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        {/* <Button type="submit">Save changes</Button> */}
                                        <Button type="submit" className="" tabIndex={5} disabled={processing}>
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Create account
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <div className="flex items-center mb-4">
                        <Input
                            type="text"
                            placeholder="Search email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-sm"
                        />
                        <Button className='ml-2' onClick={() => {
                            router.get(route('userlist.index'), { search });
                        }} disabled={processing} variant="secondary">
                            Search
                        </Button>
                    </div>
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
                                    {/* <TableHead>Update</TableHead> */}
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
                                        {/* <TableCell>
                                            <Button className='transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-white hover:bg-orange-600'>Update</Button>
                                        </TableCell> */}
                                        <TableCell className="">
                                            <Button variant="destructive">
                                                <Link href={route("userlist.destroy", user.id)} method="delete" as="button">
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

