<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Schedule extends Model
{
    public function film(): BelongsTo{
        return $this->belongsTo(Film::class, 'film_id');
    }

    public function theater(): BelongsTo{
        return $this->belongsTo(Theater::class, 'theater_id');
    }
    public function pemesanan(): HasMany{
        return $this->hasMany(Pemesanan::class, 'schedule_id');
    }
}
