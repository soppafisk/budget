@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10">
            <h1>Users</h1>
            <ul>
                @foreach($plan->users as $user)
                    <li>
                        {{ $user->name }}
                        <a href="{{ route('plan.associateUserRemove', [
                                        'planId' => $plan->id,
                                        'userId' => $user->id
                                    ])
                                }}">
                            <span class="fa fa-times"></span>
                        </a>
                    </li>
                @endforeach
            </ul>

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

