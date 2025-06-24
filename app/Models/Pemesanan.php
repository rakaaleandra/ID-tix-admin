<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pemesanan extends Model
{
    protected $table = 'pemesanans';
    protected $fillable = [
        'user_id',
        'schedule_id',
        'bukti_bayar',
        'code_pemesanan',
        'status_pemesanan',
        'feedback'
    ];
    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id');
    }
    public function schedule(): BelongsTo{
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }
    public function tickets(): HasMany{
        return $this->hasMany(Ticket::class, 'pemesanan_id');
    }
}
