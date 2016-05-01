<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('plan_user', function(Blueprint $table)
        {
          $table->integer('plan_id')->unsigned()->index();
          $table->foreign('plan_id')->references('id')->on('plans');

          $table->integer('user_id')->unsigned()->index();
          $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plan_user', function(Blueprint $table) {
          $table->dropForeign('plan_user_plan_id_foreign');
          $table->dropForeign('plan_user_user_id_foreign');
        });

        Schema::drop('plans');
    }
}
