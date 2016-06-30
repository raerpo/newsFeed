var React = require('react');
var Article = require('./article.jsx');
var $ = require('jquery');

var data = require('../../data/news_mock.json');

var NewsFeed = React.createClass({
	getInitialState: function() {
		localStorage.setItem('activeTitle', '');
		return ({
			articlesState: 'hidden',
			activeTitle: '',
			articlesData: []
		});
	},
	componentWillMount: function() {
		if(!this.props.urlData) {
			console.log('Local Data');
			this.setState({
				articlesData : data
			});
		}
		else {
			console.log('Request');
			$.get(this.props.urlData, function(data){
				this.setState({
					articlesData : data
				});
			}.bind(this));
		}
	},
	changeActiveTitle: function(item) {
		localStorage.setItem('activeTitle', item );
		this.setState({
			activeTitle: item
		});
	},
	removeActiveTitle: function() {
		this.setState({
			activeTitle: ''
		});
	},
	showArticles: function() {
		//Cambio inicial de estado
		if( this.state.articlesState === 'hidden' ) {
			this.setState({
				articlesState: 'bounceInLeft'
			});
			return;
		}
		this.setState({
			articlesState: (this.state.articlesState === 'bounceInLeft') ? 'bounceOutLeft' : 'bounceInLeft'
		});
	},
	render: function() {
		var news = this.state.articlesData;
		//Crear lista de articulos
		var articleList = news.map(function(article_info, index) {
			return(
				<Article
					className={'animated ' + (this.state.articlesState + '-' + (index+1) )}
					removeActiveTitle={this.removeActiveTitle}
					changeActiveTitle={this.changeActiveTitle.bind(this, article_info.title)}
					data={article_info}
					key={'article_' + index}
				/>
			);
		}.bind(this));
		return(
			<div className="rappi__container animated bounceInUp">
				<div className="rappi__header">
					<button className="rappi__header-menu" onClick={this.showArticles}></button>
					<h1 className={'animated '  + (this.state.activeTitle !== '' ? 'bounceInDown' : 'bounceOutLeft')}>{this.state.activeTitle || localStorage.getItem('activeTitle')}</h1>
				</div>
				<div className="rappi__content">
					{articleList}
				</div>
			</div>
		)
	}
});

module.exports = NewsFeed;
