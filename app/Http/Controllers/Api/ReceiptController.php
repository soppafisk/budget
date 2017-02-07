<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use Log;
use App\Http\Requests;
use App\Plan;
use App\Receipt;
use App\Store;
use App\User;
use JWTAuth;
use Carbon\Carbon;
use Dingo\Api\Routing\Helpers;
use Illuminate\Routing\Controller;

class ReceiptController extends Controller
{
    use Helpers;

    public function store(Request $request, $planId)
    {
        $data = $request->except(['buy_date']);

        $date = Carbon::parse($request->input('buy_date'));
        $data['buy_date'] = $date;
        $receipt = new Receipt($data);

        $user = User::findOrFail($data['user_id']);

        $storeName = $request->input('store');
        $store = Store::firstOrCreate(['name' => $storeName]);
        $receipt->store()->associate($store);

        $plan = Plan::findOrFail($planId);
        $receipt->plan()->associate($plan);

        $user->receipts()->save($receipt);

        $year = $receipt->buy_date->year;
        $month = $receipt->buy_date->month;

        $receipts = $plan->receipts()
            ->whereYear('buy_date', '=', $year)
            ->whereMonth('buy_date', '=', $month)
            ->with(['store'])
            ->get();

        return [
            'receipts' => $receipts,
            'planData' => [
                'planId' => $planId,
                'month'  => $month,
                'year'   => $year,
                'users'  => $plan->users->toArray(),
            ]
        ];
    }

    public function show($planId, $year = null, $month = null)
    {
        if (!$year || !$month) {
            throw new Symfony\Component\HttpKernel\Exception\NotFoundHttpException('Date not specified');
        }
        $plan = Plan::findOrFail($planId);

        $receipts = $plan->receipts()
            ->whereYear('buy_date', '=', $year)
            ->whereMonth('buy_date', '=', $month)
            ->with(['store'])
            ->get();

        return [
            'receipts' => $receipts,
            'planData' => [
                'planId' => $planId,
                'month'  => $month,
                'year'   => $year,
                'users'  => $plan->users->toArray(),
            ]
        ];
    }

    public function remove(Request $request, $planId, $receiptId)
    {
        $plan = Plan::findOrFail($planId);
        $user = JWTAuth::parseToken()->toUser();
        if (!$plan->users->contains($user->id)) {
            return $this->response->errorForbidden();
        }

        $receipt = $plan->receipts()->findOrFail($receiptId);


        if (!$receipt->delete()) {
            return $this->response->errorInternal();
        }

        return $this->response->noContent();
    }
}
