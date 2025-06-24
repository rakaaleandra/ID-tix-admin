import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'QR Scanner',
        href: '/qrscan',
    },
];

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
    
    const handleCetakTiket = () => {
        if (!foundPemesanan) return;

        router.post('/qrscan/update-status', {
            id: foundPemesanan.id,
            status_pemesanan: 'kadaluarsa',
        }, {
            onSuccess: () => {
                setFoundPemesanan(prev => prev ? { ...prev, status_pemesanan: 'kadaluarsa' } : null);
                alert("Tiket berhasil dicetak dan status diperbarui.");
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="QR Scanner" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="flex flex-col items-center justify-center p-4">
                        <div id="qr-scanner" ref={scannerRef} className="w-[500px] h-[500px] border rounded-md" />

                        <div className="mt-4">
                            {scanResult && (
                                <>
                                    <p className="text-lg font-semibold">QR Code: {scanResult}</p>
                                    {foundPemesanan ? (
                                        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full max-w-xl">
                                            <p className="text-xl font-semibold mb-2 text-green-600">✅ Pemesanan Ditemukan</p>
                                            <div className="space-y-2 text-sm">
                                                <p><strong>Nama User:</strong> {foundPemesanan.user.name}</p>
                                                <p><strong>Nama Film:</strong> {foundPemesanan.schedule.film.nama_film}</p>
                                                <p><strong>Jadwal Tayang:</strong> {foundPemesanan.schedule.tanggal_tayang} - {foundPemesanan.schedule.jam_tayang}</p>
                                                <p><strong>Bioskop:</strong> {foundPemesanan.schedule.theater.nama_bioskop} - {foundPemesanan.schedule.theater.lokasi_bioskop}</p>
                                                <p><strong>Status Pemesanan:</strong> {foundPemesanan.status_pemesanan}</p>
                                                <p><strong>Tanggal Pemesanan:</strong> {new Date(foundPemesanan.created_at).toLocaleString()}</p>
                                                <p><strong>Code Pemesanan:</strong> {foundPemesanan.code_pemesanan}</p>
                                                {foundPemesanan.bukti_bayar && (
                                                    <div>
                                                        <p><strong>Bukti Bayar:</strong></p>
                                                        <img src={foundPemesanan.bukti_bayar} alt="Bukti Bayar" className="mt-1 w-48 h-auto border rounded" />
                                                    </div>
                                                )}
                                            </div>
                                            {foundPemesanan.status_pemesanan !== 'kadaluarsa' && (
                                                <button
                                                    onClick={handleCetakTiket}
                                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                                >
                                                    Cetak Tiket
                                                </button>
                                            )}

                                            {foundPemesanan.status_pemesanan === 'kadaluarsa' && (
                                                <p className="mt-4 text-yellow-600 font-semibold">Tiket sudah kadaluarsa</p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-red-500 text-lg mt-4">❌ Data tidak ditemukan untuk QR: {scanResult}</p>
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
