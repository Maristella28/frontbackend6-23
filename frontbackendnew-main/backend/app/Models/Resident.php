<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'resident_id',
        'household_number',
        'first_name',
        'middle_name',
        'last_name',
        'date_of_birth',
        'place_of_birth',
        'gender',
        'citizenship',
        'civil_status',
        'current_photo',
        'current_address',
        'mobile_number',
        'landline_number',
        'email',
    ];
public function user()
{
    return $this->belongsTo(User::class);
}

public function profile()
{
    return $this->belongsTo(Profile::class);
}
}

