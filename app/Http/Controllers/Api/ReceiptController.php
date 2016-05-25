<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use Log;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Plan;
use App\Receipt;
use App\Store;
use JWTAuth;
use Carbon\Carbon;

class ReceiptController extends Controller
{
    public function month($planId, $month)
    {

    }

    public function store(Request $request, $planId)
    {
        $receipt = new Receipt($request->all()['receipt']);
        Log::info($receipt);
        $user = JWTAuth::parseToken()->toUser();

        $storeName = $request->input('receipt.store');
        $date = $request->input('receipt.buy_date');
        $receipt->buy_date = Carbon::createFromFormat('Y-m-d', $date);
        Log::info($request->buy_date);
        $store = Store::firstOrCreate(['name' => $storeName]);
        $receipt->store()->associate($store);

        $plan = Plan::findOrFail($planId);
        $receipt->plan()->associate($plan);

        $user->receipts()->save($receipt);

        return $receipt;
    }

    public function show($planId, $month)
    {
        $plan = Plan::findOrFail($planId);

        $receipts = $plan->receipts()
            ->get();
        foreach ($receipts as $r) {
            Log::info($r->buy_date);
        }
        return $receipts;
    }
}
