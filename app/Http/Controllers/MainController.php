<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pemesanan;
use App\Models\Film;
use App\Models\Theater;
use App\Models\Schedule;
use App\Models\Ticket;
use Illuminate\Validation\Rule;

class MainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function dashboard(){
        return Inertia::render('dashboard');
    }

    public function index()
    {
        return Inertia::render('orderlist', [
            'pemesanan' => Pemesanan::with(['schedule.film', 'schedule.theater', 'user'])->get()
        ]);    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $validated = $request->validate([
        //     'id' => 'required|exists:pemesanans,id',
        //     'status_pemesanan' => 'nullable|in:berhasil,gagal,masalah,null',
        // ]);

        // // Cari pemesanan berdasarkan ID
        // $pemesanan = Pemesanan::findOrFail($validated['id']);
        // $status = $validated['status_pemesanan'] === 'null' ? null : $validated['status_pemesanan'];

        // // Update status
        // $pemesanan->status_pemesanan = $status;
        // $pemesanan->save();

        // if (in_array($status, ['gagal', 'masalah'])) {
        //     $pemesanan->tickets()->update(['status_booking' => false]);
        // }

        // return redirect()->back()->with('success', 'Status pemesanan berhasil diperbarui.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:pemesanans,id',
            'status_pemesanan' => ['required', Rule::in(['berhasil', 'gagal', 'masalah'])],
            'feedback' => 'nullable|string',
        ]);
        $status = $validated['status_pemesanan'];
        $feedback = $validated['feedback'] ?? null;
        $pemesanan = Pemesanan::find($validated['id']);
        // $pemesanan->update(['status_pemesanan' => $status]);
        // $pemesanan->update(['feedback' => $feedback]);
        $pemesanan->update([
            'status_pemesanan' => $status,
            'feedback' => $feedback,
        ]);

        if (in_array($status, ['gagal', 'masalah'])) {
            $pemesanan->tickets()->update(['status_booking' => false]);
        }
    
        // return redirect()->back()->with('success', 'Status updated successfully!');
        return redirect(route('orderlist'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
