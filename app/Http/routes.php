<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function($api) {
    $api->get('/plan/{id}/month/{month}', 'App\Http\Controllers\Api\ReceiptController@show');
    $api->post('plan/{planId}/receipt', 'App\Http\Controllers\Api\ReceiptController@store');

});

Route::get('/', function () {
    return view('welcome');
});

Route::auth();

Route::get('/home', 'HomeController@index');

Route::get('/plan', 'PlanController@index');

Route::get('/plan/{id}', 'PlanController@show');

Route::post('/plan/store', ['as' => 'plan.store', 'uses' => 'PlanController@store']);
