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
        Schema::create('lapping', function (Blueprint $table) {
            $table->unsignedBigInteger('datalist_id')->nullable();
            $table->string('datalist_lot_number')->nullable();
            $table->string('model')->nullable();
            $table->string('operator_name')->nullable();
            $table->string('checker')->nullable();
            $table->string('shift')->nullable();
            $table->string('staff_engineer')->nullable();
            $table->integer('batch_number')->nullable();
            $table->string('comparator_serial')->nullable();
            $table->json('mass_pro')->nullable();
            $table->enum('status', ['preparing', 'prepared', 'measuring', 'measured', 'approved'])->default('preparing');
            $table->timestamps();
            $table->index(['datalist_lot_number', 'updated_at','model']);
            //Composite Foreign Key
            $table->foreign(['datalist_id'])
                ->references(['id'])
                ->on('datalists')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lapping');
    }
};
