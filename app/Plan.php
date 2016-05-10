<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = ['name'];

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function receipts()
    {
        return $this->hasMany('App\Receipt')->orderBy('buy_date', 'desc');
    }
}
