<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable = ['name'];

    public function receipts()
    {
        return $this->hasMany('App\Receipt');
    }
}
