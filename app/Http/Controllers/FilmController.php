<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Film;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $films = Film::query()
            ->when($search, fn($query) =>
                $query->where('nama_film', 'like', '%' . $search . '%')
            )
            ->get();

        return Inertia::render('filmlist', [
            'films' => $films,
            'filters' => [
                'search' => $search,
            ],
        ]);
        // return Inertia::render('filmlist', [
        //     'films' => Film::all()
        // ]);
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
    public function store(Request $request){
        $validated = $request->validate([
            'nama_film' => 'required|string|max:255',
            'slug' => 'required|string|unique:films,slug',
            'poster_film' => 'required|string',
            'trailer_film' => 'required|string',
            'durasi_film' => 'required|integer',
            'sutradara_film' => 'required|string',
            'genre_film' => 'required|string',
            'produser' => 'required|string',
            'produksi' => 'required|string',
            'casts' => 'required|string',
            'sinopsis' => 'required|string',
            'tayang' => 'nullable|boolean',
            'tampil_web' => 'nullable|boolean',
        ]);

        Film::create($validated);

        return redirect()->back();
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
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'nama_film' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:films,slug,' . $id,
            'poster_film' => 'required|string|max:255',
            'trailer_film' => 'required|string|max:255',
            'durasi_film' => 'required|integer|min:1',
            'sutradara_film' => 'required|string|max:255',
            'genre_film' => 'required|string|max:255',
            'produser' => 'required|string|max:255',
            'produksi' => 'required|string|max:255',
            'casts' => 'required|string|max:255',
            'sinopsis' => 'required|string',
            'tayang' => 'nullable|boolean',
            'tampil_web' => 'nullable|boolean',
        ]);

        // Cari film berdasarkan ID
        $film = Film::findOrFail($id);

        // Update data
        $film->update($validated);

        // Redirect kembali ke halaman sebelumnya dengan pesan
        return redirect()->back()->with('success', 'Film berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Film $filmlist)
    {
        $filmlist->delete();
        
        return redirect()->back()->with('success', 'Film berhasil dihapus.');
    }
}
