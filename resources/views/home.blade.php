@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>
                {!! Form::open(array('action' => ['UserController@setColor', $user->id])) !!}
                    {{ Form::input('color', 'user_color', $user->color, ['class' => 'form-control']) }}
                    {{ Form::submit('Ändra färg', ['class' => 'form-control']) }}
                {!! Form::close() !!}
                <div class="panel-body">
                    You are logged in!
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
