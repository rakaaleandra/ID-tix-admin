<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pemesanan extends Model
{
    protected $table = 'pemesanans';
    protected $fillable = [
        'user_id',
        'schedule_id',
        'bukti_bayar',
        'status_pemesanan'
    ];
    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id');
    }
    public function schedule(): BelongsTo{
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }
}
