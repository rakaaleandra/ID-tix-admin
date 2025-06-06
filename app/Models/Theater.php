<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Model;

class Theater extends Model
{
    public function schedules(): HasMany{
        return $this->hasMany(Schedule::class, 'theater_id');
    }
}
