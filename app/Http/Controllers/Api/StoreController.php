<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Store;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class StoreController extends Controller
{
    public function search(Request $request)
    {
        $storeName = $request->input('term');

        $stores = Store::where('name', 'LIKE', '%' . $storeName . '%')
            ->limit(10)
            ->get(['id', 'name']);

        return ['stores' => $stores];
    }
}
