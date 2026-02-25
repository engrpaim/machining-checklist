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
        Schema::create('models', function (Blueprint $table) {
            $table->id();
            $table->string('model');
            $table->float('barelling_target');
            $table->float('barelling_min');
            $table->float('barelling_max');
            $table->float('chamfer_barelling_target');
            $table->float('chamfer_barelling_min');
            $table->float('chamfer_barelling_max');
            $table->enum('chamfer_type', ['REF. VAL.', 'R- CHAMFER', 'C- CHAMFER']);
            $table->float('cghl_target');
            $table->float('cghl_max');
            $table->float('cghl_min');
            $table->float('lappingt_target');
            $table->float('lappingt_max');
            $table->float('lappingt_min');
            $table->float('flatness_lapping');
            $table->float('parallelism_lapping');
            $table->float('height_lapping');
            $table->float('slicing_target');
            $table->float('slicing_max');
            $table->float('slicing_min');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('models');
    }
};
