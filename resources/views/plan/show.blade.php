@extends('layouts.app')

@section('content')
   <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
            <h1>{{ $plan->name }}</h1>
        </div>
        <meta name="data-token" content="{{ $token }}" />

        <div class="row">
            <div class="col-xs-10 col-xs-offset-1">
                <div id="plan">
                </div>
            </div>
        </div>
   </div>
@stop