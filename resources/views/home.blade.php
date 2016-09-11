@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">Din färg</div>
                        <div class="panel-body">
                            {!! Form::open(array('action' => ['UserController@setColor', $user->id])) !!}
                                {{ Form::input('color', 'user_color', $user->color, ['class' => 'form-control']) }}
                                {{ Form::submit('Ändra färg', ['class' => 'form-control']) }}
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">Planer</div>
                        <div class="panel-body">
                            @foreach($plans as $plan)
                                <h3>{!! link_to_action('PlanController@show', $plan->name, [$plan->id]) !!}</h3>
                            @endforeach

                            {!! Form::open(['route' => ['plan.store', 'token' => $token]]) !!}

                            <div class="form-group">
                                {!! Form::label('name', 'Ny plan:') !!}
                                {!! Form::text('name', null, ['class' => 'form-control']) !!}
                            </div>
                            <div class="form-group">
                                {!! Form::submit('Lägg till', ['class' => 'btn btn-primary form-control']) !!}
                            </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
