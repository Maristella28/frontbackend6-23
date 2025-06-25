<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ResidentController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile;

        if (!$profile) {
            return response()->json(['message' => 'User profile not found.'], 404);
        }

        $existing = Resident::where('profile_id', $profile->id)->first();
        if ($existing) {
            return response()->json(['message' => 'Resident already exists.'], 409);
        }

        $validated = $request->validate([
            'household_number' => 'required|string',
            'current_photo'    => 'nullable|image|max:2048',
        ]);

        // Upload photo
        $photoPath = null;
        if ($request->hasFile('current_photo')) {
            $photoPath = $request->file('current_photo')->store('residents', 'public');
        }

        $resident = Resident::create([
            'user_id'           => $user->id,
            'profile_id'        => $profile->id,
            'resident_id'       => $profile->resident_id, // ✅ fixed field name
            'household_number'  => $validated['household_number'],
            'first_name'        => $profile->first_name,
            'middle_name'       => $profile->middle_name,
            'last_name'         => $profile->last_name,
            'name_suffix'       => $profile->name_suffix,
            'birth_date'        => $profile->birth_date,
            'birth_place'       => $profile->birth_place,
            'age'               => $profile->age,
            'email'             => $profile->email,
            'contact_number'    => $profile->contact_number,
            'gender'            => $profile->sex,
            'civil_status'      => $profile->civil_status,
            'religion'          => $profile->religion,
            'full_address'      => $profile->full_address,
            'years_in_barangay' => $profile->years_in_barangay,
            'voter_status'      => $profile->voter_status,
            'current_address'   => $profile->full_address,
            'current_photo'     => $photoPath ?? $profile->avatar,
        ]);

        return response()->json([
            'message'  => 'Resident data stored using profile info.',
            'resident' => $resident,
        ], 201);
    }

    public function index()
    {
        $residents = Resident::with('profile')->get();

        return response()->json([
            'residents' => $residents
        ]);
    }
}
