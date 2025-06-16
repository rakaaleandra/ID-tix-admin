<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    //
    protected $table = 'tickets';
    protected $fillable = [
        'schedule_id',
        'pemesanan_id',
        'status_booking',
        'nomor_kursi'
    ];

    public function pemesanan(): BelongsTo{
        return $this->belongsTo(Pemesanan::class, 'pemesanan_id');
    }
    public function schedule(): BelongsTo{
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }
}
