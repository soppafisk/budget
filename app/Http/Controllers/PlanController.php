<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use JWTAuth;
use App\Plan;

class PlanController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $token = JWTAuth::fromUser($user);
        return view('plan/index', compact('token'));
    }

    public function show($id)
    {
        $user = JWTAuth::parseToken()->toUser();
        $plan = Plan::findOrFail($id)->with(['users'])->first();

        $stores = Store::get();
        return view('plans.show', compact('plan', 'stores'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $plan = new Plan($request->all());
        $user = JWTAuth::parseToken()->toUser();
        $user->plans()->save($plan);

        return redirect('plan');
    }
}
