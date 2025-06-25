<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    // Define fillable fields to allow mass assignment
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'name_suffix',
        'birth_date',
        'birth_place',
        'age',
        'email',
        'contact_number',
        'sex',
        'civil_status',
        'religion',
        'full_address',
        'years_in_barangay',
        'residents_id',
        'voter_status',
        'avatar',
    ];

    // Define relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

public function resident()
{
    return $this->hasOne(Resident::class);
}
}
