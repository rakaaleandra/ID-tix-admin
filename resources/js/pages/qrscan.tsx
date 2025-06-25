import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'QR Scanner',
        href: '/qrscan',
    },
];

interface User{
    id:number;
    name : string;
    email: string;
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
    status_pemesanan: 'berhasil' | 'gagal' | 'masalah' | 'kadaluarsa' | null | "null";
    schedule: Schedule;
    user: User;
    bukti_bayar: string;
    created_at: string;
    code_pemesanan: string;
}

interface Props {
    pemesanan: Pemesanan[];
}

export default function QrScan({pemesanan}: Props) {
    const scannerRef = useRef<HTMLDivElement>(null);
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [foundPemesanan, setFoundPemesanan] = useState<Pemesanan | null>(null);
    // const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    // const isScanning = useRef(false);
    
    const handleCetakTiket = () => {
        if (!foundPemesanan) return;

        router.post('/qrscan/update-status', {
            id: foundPemesanan.id,
            status_pemesanan: 'kadaluarsa',
        }, {
            onSuccess: () => {
                // setFoundPemesanan(prev => prev ? { ...prev, status_pemesanan: 'kadaluarsa' } : null);
                // alert("Tiket berhasil dicetak dan status diperbarui.");
                window.location.reload();
            },
            onError: (errors) => {
                console.error(errors);
                alert("Gagal memperbarui status.");
            },
        });
    };

    useEffect(() => {
        if (scannerRef.current) {
            const html5QrCode = new Html5Qrcode("qr-scanner");

            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 60,
                    qrbox: 400,
                },
                (decodedText: string) => {
                    setScanResult(decodedText);
                    html5QrCode.stop();

                    // Cek apakah code_pemesanan cocok
                    const result = pemesanan.find(p => p.code_pemesanan === decodedText);
                    if (result) {
                        setFoundPemesanan(result);
                    } else {
                        setFoundPemesanan(null);
                    }
                },
                (errorMessage) => {
                    // console.log('Scanning error:', errorMessage);
                }
            ).catch(err => {
                console.error("Failed to start QR scanner:", err);
            });

            return () => {
                html5QrCode.stop().catch(() => {});
            };
        }
    }, [pemesanan]);
    // useEffect(() => {
    //     if (scannerRef.current && !scanResult) {
    //         const html5QrCode = new Html5Qrcode("qr-scanner");
    //         html5QrCodeRef.current = html5QrCode;

    //         html5QrCode.start(
    //         { facingMode: "environment" },
    //         { fps: 60, qrbox: 400 },
    //         (decodedText) => {
    //             if (!isScanning.current) {
    //             isScanning.current = true;
    //             setScanResult(decodedText);
    //             html5QrCode.stop().catch(() => {});
    //             const result = pemesanan.find(p => p.code_pemesanan === decodedText);
    //             setFoundPemesanan(result || null);
    //             }
    //         },
    //         (error) => {
    //             // optionally log scanning errors
    //         }
    //         ).catch(console.error);

    //         return () => {
    //         html5QrCode.stop().catch(() => {});
    //         };
    //     }
    // }, [pemesanan, scanResult]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="QR Scanner" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="flex flex-col items-center justify-center p-8">
                        <h1 className="text-3xl font-bold mb-4">QR Code Scanner</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Arahkan kamera ke QR Code untuk memindai. Pastikan QR berada dalam jangkauan dan terlihat jelas.
                        </p>
                        {!scanResult && (
                            <div id="qr-scanner" ref={scannerRef} className="w-[500px] h-[500px] border rounded-md" />
                        )}

                        <div className="mt-4">
                            {scanResult && (
                                <>
                                    {/* <p className="text-lg font-semibold">QR Code: {scanResult}</p> */}
                                    {foundPemesanan ? (
                                        <div className="p-8 rounded-lg shadow-md w-3xl border border-gray-800">
                                            <p className="text-xl font-bold mb-2 ">Pesanan Ditemukan</p>
                                            <div className="flex flex-col gap-2">
                                                <div className='flex flex-row justify-between w-full'>
                                                    <h1>Nama Film</h1>
                                                    <p className="text-gray-300">{foundPemesanan.schedule.film.nama_film}</p>
                                                </div>
                                                <div className='flex flex-row justify-between w-full'>
                                                    <h1>Theater</h1>
                                                    <p className="text-gray-300">{foundPemesanan.schedule.theater.nama_bioskop}</p>
                                                </div>
                                                <div className='flex flex-row justify-between w-full'>
                                                    <h1>Tanggal</h1>
                                                    <p className="text-gray-300">{foundPemesanan.schedule.tanggal_tayang}</p>
                                                </div>
                                                <div className='flex flex-row justify-between w-full'>
                                                    <h1>Waktu</h1>
                                                    <p className="text-gray-300">{foundPemesanan.schedule.jam_tayang}</p>
                                                </div>
                                                <div className='flex flex-row justify-between w-full'>
                                                    <h1>Email Pembeli</h1>
                                                    <p className="text-gray-300">{foundPemesanan.user.email}</p>
                                                </div>
                                                {/* <p><strong>Nama User:</strong> {foundPemesanan.user.name}</p>
                                                <p><strong>Nama Film:</strong> {foundPemesanan.schedule.film.nama_film}</p>
                                                <p><strong>Jadwal Tayang:</strong> {foundPemesanan.schedule.tanggal_tayang} - {foundPemesanan.schedule.jam_tayang}</p>
                                                <p><strong>Bioskop:</strong> {foundPemesanan.schedule.theater.nama_bioskop} - {foundPemesanan.schedule.theater.lokasi_bioskop}</p>
                                                <p><strong>Status Pemesanan:</strong> {foundPemesanan.status_pemesanan}</p>
                                                <p><strong>Tanggal Pemesanan:</strong> {new Date(foundPemesanan.created_at).toLocaleString()}</p>
                                                <p><strong>Code Pemesanan:</strong> {foundPemesanan.code_pemesanan}</p> */}
                                                {/* {foundPemesanan.bukti_bayar && (
                                                    <div>
                                                        <p><strong>Bukti Bayar:</strong></p>
                                                        <img src={foundPemesanan.bukti_bayar} alt="Bukti Bayar" className="mt-1 w-48 h-auto border rounded" />
                                                    </div>
                                                )} */}
                                            </div>
                                            {foundPemesanan.status_pemesanan === 'berhasil' && (
                                                <Button
                                                    onClick={handleCetakTiket}
                                                    className="mt-6 w-full"
                                                >
                                                    Cetak Tiket
                                                </Button>
                                            )}

                                            {foundPemesanan.status_pemesanan !== 'berhasil' && (
                                                <>
                                                    <p className="mt-4 text-yellow-600 font-semibold">Pesanan Anda gagal / masalah / sudah kadaluarsa</p>
                                                    <Button
                                                        onClick={() => {
                                                            setScanResult(null);
                                                            setFoundPemesanan(null);
                                                            window.location.reload();
                                                            // router.reload();
                                                        }}
                                                        className="mt-6 w-full"
                                                        variant={"secondary"}
                                                    >
                                                        Scan Ulang
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            {/* <p className="text-red-500 text-lg mt-4">❌ Data tidak ditemukan untuk QR: {scanResult}</p> */}
                                            <p className="text-red-500 text-lg w-full">Data QR Code tidak ditemukan</p>
                                            <Button
                                                onClick={() => {
                                                    setScanResult(null);
                                                    setFoundPemesanan(null);
                                                    window.location.reload();
                                                    // router.reload();
                                                }}
                                                className="mt-6 w-full"
                                                variant={"secondary"}
                                            >
                                                Scan Ulang
                                            </Button>
                                        </>
                                    )}

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
