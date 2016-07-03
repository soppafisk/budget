@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10">
            <h1>Users</h1>

            @foreach($plan->users as $user)
                <h3>{{ $user->name }}</h3>
            @endforeach

            {!! Form::open(['route' => ['plan.associateUser', 'id' => $plan->id ]]) !!}

            <div class="form-group">
                {!! Form::label('name', 'Email:') !!}
                {!! Form::text('email', null, ['class' => 'form-control']) !!}
            </div>
            <div class="form-group">
                {!! Form::submit('Add', ['class' => 'btn btn-primary form-control']) !!}
            </div>

            {!! Form::close() !!}
        </div>
    </div>
</div>
@endsection

