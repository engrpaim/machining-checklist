<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->integer('id_number')->unique('id_number');
            $table->string('ip_address');
            $table->string('name')->required();
            $table->string('surname')->required();
            $table->string('area')->required();
            $table->string('proxy')->nullable();
            $table->string('password')->nullable();
            $table->enum('permission',['normal','pic','admin','leader','proxy'])->default('normal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
