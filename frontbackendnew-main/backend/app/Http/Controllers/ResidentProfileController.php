<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;

class ResidentProfileController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'birth_date' => 'required|date',
            'birth_place' => 'required|string',
            'age' => 'required|integer',
            'email' => 'required|email',
            'contact_number' => 'required|string',
            'sex' => 'required|string',
            'civil_status' => 'required|string',
            'religion' => 'required|string',
            'full_address' => 'required|string',
            'years_in_barangay' => 'required|integer',
            'voter_status' => 'required|string',  // added
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',// added
        ]);

        $user = Auth::user();
        $now = now();
        $year = $now->format('y');
        $month = $now->format('m');

        // Count how many profiles already exist this month
        $count = Profile::whereYear('created_at', $now->year)
                        ->whereMonth('created_at', $now->month)
                        ->count() + 1;

        $sequence = str_pad($count, 2, '0', STR_PAD_LEFT);
        $residents_id = "{$year}{$month}{$sequence}";

        $profile = new Profile([
            ...$request->all(),
            'residents_id' => $residents_id
        ]);

        $user->profile()->save($profile); // if you define relation in User model

        return response()->json(['message' => 'Profile completed', 'residents_id' => $residents_id], 201);
    }
    public function update(Request $request)
{
    $request->validate([
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'birth_date' => 'required|date',
        'birth_place' => 'required|string',
        'age' => 'required|integer',
        'email' => 'required|email',
        'contact_number' => 'required|string',
        'sex' => 'required|string',
        'civil_status' => 'required|string',
        'religion' => 'required|string',
        'full_address' => 'required|string',
        'years_in_barangay' => 'required|integer',
        'voter_status' => 'required|string',
        'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $user = Auth::user();
    $profile = $user->profile;

    if (!$profile) {
        return response()->json(['message' => 'Profile not found.'], 404);
    }

    $data = $request->except('avatar');

    // ✅ Handle image upload
    if ($request->hasFile('avatar')) {
        $avatarPath = $request->file('avatar')->store('avatars', 'public');
        $data['avatar'] = $avatarPath;
    }

    $profile->update($data);

    return response()->json(['message' => 'Profile updated successfully.']);
}

public function user(Request $request)
{
    return response()->json([
        'user' => $request->user()->load('profile') // 👈 important!
    ]);
}
public function index()
{
    $profiles = Profile::all();

    return response()->json([
        'residents' => $profiles
    ]);
}
}

