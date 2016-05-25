<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use JWTAuth;
use App\Plan;
use App\Store;

class PlanController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $token = JWTAuth::fromUser($user);
        $plans = $user->plans()->get();

        return view('plan/index', compact('token', 'plans'));
    }

    public function show($id)
    {
        $user = Auth::user();
        $token = JWTAuth::fromUser($user);

        $plan = Plan::with(['users'])->findOrFail($id);
        $stores = Store::get();
        return view('plan.show', compact('plan', 'stores', 'token'));
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
