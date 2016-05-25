@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10">
            <h1>Plans</h1>

            @foreach($plans as $plan)
              <h2>{!! link_to_action('PlanController@show', $plan->name, [$plan->id]) !!}</h2>
              <p>{{ $plan->description }}</p>
            @endforeach

            {!! Form::open(['route' => ['plan.store', 'token' => $token]]) !!}

            <div class="form-group">
                {!! Form::label('name', 'Name:') !!}
                {!! Form::text('name', null, ['class' => 'form-control']) !!}
            </div>
            <div class="form-group">
                {!! Form::submit('Add', ['class' => 'btn btn-primary form-control']) !!}
            </div>

            {!! Form::close() !!}
        </div>
    </div>
</div>
@endsection
