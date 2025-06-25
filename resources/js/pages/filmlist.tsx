import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Clock, User, Clapperboard, Layers2 } from 'lucide-react';
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, FormEventHandler, useState } from 'react';

interface Film{
    id : number;
    nama_film : string;
    slug : string;
    poster_film : string;
    trailer_film : string;
    durasi_film : number;
    sutradara_film : string;
    genre_film : string;
    produser : string;
    produksi : string;
    casts : string;
    sinopsis : string;
    tayang : boolean;
    tampil_web : boolean;
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

type FilmForm = {
    nama_film : string;
    slug : string;
    poster_film : string;
    trailer_film : string;
    durasi_film : number;
    sutradara_film : string;
    genre_film : string;
    produser : string;
    produksi : string;
    casts : string;
    sinopsis : string;
    tayang : boolean;
    tampil_web : boolean;
};

export default function Dashboard({films}:Props) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<FilmForm>>({
        nama_film: '',
        slug: '',
        poster_film: '',
        trailer_film: '',
        durasi_film: 0,
        sutradara_film: '',
        genre_film: '',
        produser: '',
        produksi: '',
        casts: '',
        sinopsis: '',
        tayang : false,
        tampil_web: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('filmlist.store'), {
            onSuccess: () => reset(),
        });
    };

    const { data: data2, setData : setData2, put, post : post2, processing : processing2, errors: errors2, reset : reset2 } = useForm<Required<FilmForm>>({
        nama_film: '',
        slug: '',
        poster_film: '',
        trailer_film: '',
        durasi_film: 0,
        sutradara_film: '',
        genre_film: '',
        produser: '',
        produksi: '',
        casts: '',
        sinopsis: '',
        tayang : false,
        tampil_web: false,
    });
    
    const submit2 = (id: number): FormEventHandler => (e) => {
        e.preventDefault();
        put(route('filmlist.update', id), {
            onSuccess: () => reset2(),
        });
    };

    const { url } = usePage();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(route('filmlist.index'), { search: searchQuery }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Film List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-8">
                    <h1 className='mb-8 font-bold text-3xl'>
                        Film List
                    </h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mb-4">Create Film</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px]">
                            <DialogHeader>
                                <DialogTitle>Create Film</DialogTitle>
                                <DialogDescription>
                                    Tambahkan film baru ke dalam daftar.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2">
                                {/* KIRI */}
                                <div className="space-y-4">
                                    <div>
                                    <Label htmlFor="nama_film">Nama Film</Label>
                                    <Input id="nama_film" value={data.nama_film} onChange={e => setData('nama_film', e.target.value)} />
                                    </div>
                                    <div>
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" value={data.slug} onChange={e => setData('slug', e.target.value)} />
                                    </div>
                                    <div>
                                    <Label htmlFor="poster_film">Poster Film</Label>
                                    <Input id="poster_film" value={data.poster_film} onChange={e => setData('poster_film', e.target.value)} />
                                    </div>
                                    <div>
                                    <Label htmlFor="trailer_film">Trailer Film</Label>
                                    <Input id="trailer_film" value={data.trailer_film} onChange={e => setData('trailer_film', e.target.value)} />
                                    </div>
                                    <div>
                                    <Label htmlFor="durasi_film">Durasi (menit)</Label>
                                    <Input type="number" id="durasi_film" value={data.durasi_film} onChange={e => setData('durasi_film', Number(e.target.value))} />
                                    </div>
                                </div>

                                {/* KANAN */}
                                <div className="space-y-4">
                                    <div>
                                    <Label htmlFor="sutradara_film">Sutradara</Label>
                                    <Input id="sutradara_film" value={data.sutradara_film} onChange={e => setData('sutradara_film', e.target.value)} />
                                    </div>
                                    <div>
                                    <Label htmlFor="genre_film">Genre</Label>
                                    <Input id="genre_film" value={data.genre_film} onChange={e => setData('genre_film', e.target.value)} />
                                    </div>
                                    <div>
                                    <Label htmlFor="produser">Produser</Label>
                                    <Input id="produser" value={data.produser} onChange={e => setData('produser', e.target.value)} />
                                    </div>
                                    <div>
                                    <Label htmlFor="produksi">Produksi</Label>
                                    <Input id="produksi" value={data.produksi} onChange={e => setData('produksi', e.target.value)} />
                                    </div>
                                    <div>
                                    <Label htmlFor="casts">Casts</Label>
                                    <Input id="casts" value={data.casts} onChange={e => setData('casts', e.target.value)} />
                                    </div>
                                </div>
                                </div>

                                {/* BAWAH */}
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <Label htmlFor="sinopsis">Sinopsis</Label>
                                        <textarea
                                        id="sinopsis"
                                        className="w-full border rounded px-3 py-2 min-h-[100px]"
                                        value={data.sinopsis}
                                        onChange={e => setData('sinopsis', e.target.value)}
                                        />
                                    </div>

                                    {/* <div className="flex items-center gap-2">
                                        <input
                                        type="checkbox"
                                        id="tampil_web"
                                        checked={data.tampil_web}
                                        onChange={e => setData('tampil_web', e.target.checked)}
                                        />
                                        <Label htmlFor="tampil_web">Tampilkan di Website</Label>
                                    </div> */}
                                    <div className='flex gap-4'>
                                        <div className="flex items-center gap-2">
                                            <input
                                            type="checkbox"
                                            id="tayang"
                                            checked={data.tayang}
                                            onChange={e => setData('tayang', e.target.checked)}
                                            />
                                            <Label htmlFor="tampil_web">Tayang</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                            type="checkbox"
                                            id="tampil_web"
                                            checked={data.tampil_web}
                                            onChange={e => setData('tampil_web', e.target.checked)}
                                            />
                                            <Label htmlFor="tampil_web">Tampilkan di Website</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p>Catatan : Tambahkan file poster pada storage website utama</p>
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="mt-4">
                                    <DialogClose asChild>
                                        <Button variant="outline" type="button">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={processing}>Simpan</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                        <Input
                            type="text"
                            placeholder="Cari film berdasarkan nama..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full max-w-sm"
                        />
                        <Button type="submit">Search</Button>
                    </form>
                    <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
                        { films.map((film) => (
                            <div key={film.id} className='border border-gray-300 dark:border-gray-800 p-4 flex flex-row gap-6 rounded-2xl'>
                                <img src={`/external-images/FilmPoster/${film.poster_film}`} alt={film.poster_film} className="h-44 w-28 rounded-2xl object-cover"/>
                                <div className='flex flex-row space-y-1 w-full'>
                                    <div className='w-full'>
                                        <h1 className='text-3xl font-bold mb-4'>{film.nama_film}</h1>
                                        <div className='flex items-center gap-2'>
                                            <Layers2 className='size-5'/>
                                            <h2>{film.genre_film}</h2>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <User className='size-5'/>
                                            <h2>{film.sutradara_film}</h2>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Clock className='size-5'/>
                                            <h2>{film.durasi_film} menit</h2>
                                        </div>
                                        {film.tayang ? (
                                            <div className='flex items-center gap-2'>
                                                <Clapperboard className='size-5'/>
                                                <h2 className='text-orange-300'>Tayang</h2>
                                            </div>
                                        ) : (
                                            <div className='flex items-center gap-2'>
                                                <Clapperboard className='size-5'/>
                                                <h2 className='text-orange-600'>Segera Tayang</h2>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex items-end gap-2 justify-end'>
                                        {/* <Button>Edit</Button> */}
                                        <Dialog onOpenChange={(open) => {
                                            if (open) {
                                                setData2({
                                                    nama_film: film.nama_film,
                                                    slug: film.slug,
                                                    poster_film: film.poster_film,
                                                    trailer_film: film.trailer_film,
                                                    durasi_film: film.durasi_film,
                                                    sutradara_film: film.sutradara_film,
                                                    genre_film: film.genre_film,
                                                    produser: film.produser,
                                                    produksi: film.produksi,
                                                    casts: film.casts,
                                                    sinopsis: film.sinopsis,
                                                    tampil_web: film.tampil_web,
                                                    tayang: film.tayang,
                                                });
                                            }
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button className="">Edit</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[800px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Film</DialogTitle>
                                                    <DialogDescription>
                                                        Tambahkan film baru ke dalam daftar.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={submit2(film.id)}>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2">
                                                    {/* KIRI */}
                                                    <div className="space-y-4">
                                                        <div>
                                                        <Label htmlFor="nama_film">Nama Film</Label>
                                                        <Input id="nama_film" value={data2.nama_film} onChange={e => setData2('nama_film', e.target.value)} placeholder={film.nama_film}/>
                                                        </div>
                                                        <div>
                                                        <Label htmlFor="slug">Slug</Label>
                                                        <Input id="slug" value={data2.slug} onChange={e => setData2('slug', e.target.value)} placeholder={film.slug}/>
                                                        </div>
                                                        <div>
                                                        <Label htmlFor="poster_film">Poster Film</Label>
                                                        <Input id="poster_film" value={data2.poster_film} onChange={e => setData2('poster_film', e.target.value)} placeholder={film.poster_film}/>
                                                        </div>
                                                        <div>
                                                        <Label htmlFor="trailer_film">Trailer Film</Label>
                                                        <Input id="trailer_film" value={data2.trailer_film} onChange={e => setData2('trailer_film', e.target.value)} placeholder={film.trailer_film}/>
                                                        </div>
                                                        <div>
                                                        <Label htmlFor="durasi_film">Durasi (menit)</Label>
                                                        <Input type="number" id="durasi_film" value={data2.durasi_film} onChange={e => setData2('durasi_film', Number(e.target.value))} placeholder={film.durasi_film.toString()}/>
                                                        </div>
                                                    </div>

                                                    {/* KANAN */}
                                                    <div className="space-y-4">
                                                        <div>
                                                        <Label htmlFor="sutradara_film">Sutradara</Label>
                                                        <Input id="sutradara_film" value={data2.sutradara_film} onChange={e => setData2('sutradara_film', e.target.value)} placeholder={film.sutradara_film} />
                                                        </div>
                                                        <div>
                                                        <Label htmlFor="genre_film">Genre</Label>
                                                        <Input id="genre_film" value={data2.genre_film} onChange={e => setData2('genre_film', e.target.value)} placeholder={film.genre_film} />
                                                        </div>
                                                        <div>
                                                        <Label htmlFor="produser">Produser</Label>
                                                        <Input id="produser" value={data2.produser} onChange={e => setData2('produser', e.target.value)} placeholder={film.produser} />
                                                        </div>
                                                        <div>
                                                        <Label htmlFor="produksi">Produksi</Label>
                                                        <Input id="produksi" value={data2.produksi} onChange={e => setData2('produksi', e.target.value)} placeholder={film.produksi} />
                                                        </div>
                                                        <div>
                                                        <Label htmlFor="casts">Casts</Label>
                                                        <Input id="casts" value={data2.casts} onChange={e => setData2('casts', e.target.value)} placeholder={film.casts} />
                                                        </div>
                                                    </div>
                                                    </div>

                                                    {/* BAWAH */}
                                                    <div className="mt-6 space-y-4">
                                                        <div>
                                                            <Label htmlFor="sinopsis">Sinopsis</Label>
                                                            <textarea
                                                            id="sinopsis"
                                                            className="w-full border rounded px-3 py-2 min-h-[100px]"
                                                            value={data2.sinopsis}
                                                            onChange={e => setData2('sinopsis', e.target.value)}
                                                            placeholder={film.sinopsis}
                                                            />
                                                        </div>

                                                        <div className='flex gap-4'>
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                type="checkbox"
                                                                id="tayang"
                                                                checked={data2.tayang}
                                                                onChange={e => setData2('tayang', e.target.checked)}
                                                                />
                                                                <Label htmlFor="tampil_web">Tayang</Label>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                type="checkbox"
                                                                id="tampil_web"
                                                                checked={data2.tampil_web}
                                                                onChange={e => setData2('tampil_web', e.target.checked)}
                                                                />
                                                                <Label htmlFor="tampil_web">Tampilkan di Website</Label>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <p>
                                                                Catatan : Jika mau mengganti poster, Anda harus menghapus poster lama terlebih dahulu kemudian upload poster baru
                                                                di storage website utama.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <DialogFooter className="mt-4">
                                                        <DialogClose asChild>
                                                            <Button variant="outline" type="button">Cancel</Button>
                                                        </DialogClose>
                                                        <Button type="submit" disabled={processing}>Simpan</Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant={"destructive"}>
                                            {/* <Link href={route("filmlist.destroy", film.id)} method="delete" as="button">
                                                Delete
                                            </Link> */}
                                            <Button variant="destructive" onClick={() => router.delete(route("filmlist.destroy", film.id))}>
                                                Delete
                                            </Button>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
