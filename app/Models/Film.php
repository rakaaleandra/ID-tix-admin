<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Film extends Model
{
    protected $fillable = [
        'nama_film',
        'durasi_film',
        'sutradara_film',
        'genre_film',
        'produser',
        'produksi',
        'casts',
        'sinopsis',
        'tayang',
        'tampil_web',
        'slug',
        'poster_film',
        'trailer_film'
    ];
    
    public function schedules(): HasMany{
        return $this->hasMany(Schedule::class, 'film_id');
    }
}
