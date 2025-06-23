<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    // ✅ List all announcements (READ)
    public function index()
    {
        $announcements = Announcement::orderBy('created_at', 'desc')->get()->map(function ($a) {
            $a->image_url = $a->image ? asset('storage/' . $a->image) : null;
            return $a;
        });

        return response()->json(['announcements' => $announcements], 200);
    }

    // ✅ Store a new announcement (CREATE)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'image'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // ✅ Match frontend
        ]);

        $data = [
            'title'        => $validated['title'],
            'content'      => $validated['content'],
            'published_at' => now(), // ✅ Set publish timestamp
        ];

        // ✅ Handle image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('announcements', 'public');
        }

        $announcement = Announcement::create($data);

        return response()->json([
            'message' => 'Announcement created successfully.',
            'announcement' => $announcement
        ], 201);
    }

    // ✅ Show a single announcement (READ ONE)
    public function show(Announcement $announcement)
    {
        $announcement->image_url = $announcement->image ? asset('storage/' . $announcement->image) : null;

        return response()->json(['announcement' => $announcement]);
    }

    // ✅ Update an announcement (UPDATE)
    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
            'image'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $announcement->title = $validated['title'];
        $announcement->content = $validated['content'];

        if ($request->hasFile('image')) {
            // ✅ Delete old image if exists
            if ($announcement->image && Storage::disk('public')->exists($announcement->image)) {
                Storage::disk('public')->delete($announcement->image);
            }

            $announcement->image = $request->file('image')->store('announcements', 'public');
        }

        $announcement->save();

        return response()->json([
            'message' => 'Announcement updated successfully.',
            'announcement' => $announcement
        ]);
    }

    // ✅ Delete an announcement (DELETE)
    public function destroy(Announcement $announcement)
    {
        if ($announcement->image && Storage::disk('public')->exists($announcement->image)) {
            Storage::disk('public')->delete($announcement->image);
        }

        $announcement->delete();

        return response()->json(['message' => 'Announcement deleted successfully.']);
    }
}
