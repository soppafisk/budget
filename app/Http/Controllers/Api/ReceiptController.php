<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use Log;
use App\Http\Requests;
use App\Plan;
use App\Receipt;
use App\Store;
use JWTAuth;
use Carbon\Carbon;
use Dingo\Api\Routing\Helpers;
use Illuminate\Routing\Controller;

class ReceiptController extends Controller
{
    use Helpers;

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

        return $receipts;
    }

    public function remove(Request $request, $planId, $receiptId)
    {
        $plan = Plan::findOrFail($planId);
        $user = JWTAuth::parseToken()->toUser();
        $receipt = $user->receipts()->findOrFail($receiptId);

        if(!$receipt) {
            return $this->response->errorForbidden();
        }

        if (!$receipt->delete()) {
            return $this->response->errorInternal();
        }

        return $this->response->noContent();
    }
}
