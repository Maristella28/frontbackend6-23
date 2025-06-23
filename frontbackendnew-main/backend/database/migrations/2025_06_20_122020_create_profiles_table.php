<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->string('residents_id')->unique();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('name_suffix')->nullable();
            $table->date('birth_date');
            $table->string('birth_place');
            $table->integer('age');
            $table->string('email');
            $table->string('contact_number');
            $table->string('sex');
            $table->string('civil_status');
            $table->string('religion');
            $table->text('full_address');
            $table->integer('years_in_barangay');
            $table->string('voter_status'); // added
            $table->string('avatar')->nullable(); // added
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('profiles');
    }
};
