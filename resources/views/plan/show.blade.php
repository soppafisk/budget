@extends('layouts.app')

@section('content')
   <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
            <h1>{{ $plan->name }}</h1>
            Användare på den här planen:
            @foreach($plan->users as $user)
                <span>{{ $user->name }}</span>
            @endforeach
        </div>
        <meta name="data-token" content="{{ $token }}" />

        <div class="row">
            <div class="col-xs-10 col-xs-offset-1">
                <div id="plan" class="col-xs-12">
                </div>
            </div>
        </div>
   </div>
@stop