var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var ArticlesList = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
	  $.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
	      this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
	      console.error(this.props.url, status, err.toString());
	    }.bind(this)
	  });
	},
	render: function() {
		var ArticleNode = this.state.data.map(function(data) {
			return (
				<Article data={data} key={data.id} />
			)
		});
		return (
			<div className="articlesList">
				{ArticleNode}
			</div>
		);
	}
});

var Article = React.createClass({

	render: function() {
		return (	
			<div className="article">
				<h2>{this.props.data.title}</h2>
				<p>{this.props.data.content}</p>
			</div>
		);
	}
});

ReactDOM.render(
	<ArticlesList url="/api/article" />,
	document.getElementById('example')
);

