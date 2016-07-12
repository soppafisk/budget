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
    $api->get('/plan/{id}/y/{year}/m/{month}', 'App\Http\Controllers\Api\ReceiptController@show');
    $api->post('plan/{planId}/receipt', 'App\Http\Controllers\Api\ReceiptController@store');
    $api->delete('/plan/{planId}/receipt/{receiptId}', 'App\Http\Controllers\Api\ReceiptController@remove');
    $api->get('/plan/{id}/', 'App\Http\Controllers\Api\ReceiptController@show');

});

Route::get('/', function () {
    return view('welcome');
});

Route::post('/user/{id}/color', 'UserController@setColor');

Route::auth();

Route::get('/home', 'HomeController@index');

Route::get('plan/{id}/adduser', 'PlanController@associateUserCreate');
Route::post('plan/{id}/adduser/',
    [
        'as' => 'plan.associateUser',
        'uses' => 'PlanController@associateUserStore'
    ]
);
Route::get('plan/{planId}/removeuser/{userId}',
    [
        'as' => 'plan.associateUserRemove',
        'uses' => 'PlanController@associateUserRemove'
    ]
);

Route::get('/plan/{id}/{params}', 'PlanController@show')->where(['params' => '.*']);
Route::get('/plan/{id}', 'PlanController@show');
Route::get('/plan', 'PlanController@index');

Route::post('/plan/store', ['as' => 'plan.store', 'uses' => 'PlanController@store']);
