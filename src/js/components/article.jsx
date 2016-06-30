var React = require('react');

var Article = React.createClass({
	clickOnArticle: function(item) {
		//Activar el articulo clickeado
		item.currentTarget.parentElement.classList.toggle('active');
		//remover todas las clases active menos para el articulo clickeado
		var activeArticles = document.getElementsByClassName('active');
		for(var i = 0; i < activeArticles.length; i++){
			if ( activeArticles[i] !== item.currentTarget.parentElement ){
				activeArticles[i].classList.remove('active');
			}
		}
		if( item.currentTarget.parentElement.className.indexOf('active') === -1) {
			//Quitar titulo activo
			this.props.removeActiveTitle();
		}
		else {
			//Poner titulo activo
			this.props.changeActiveTitle();
		}
	},
	render: function(){
		return(
			<div className={'rappi__article ' + this.props.className}>
				<div className="rappi__article-title" onClick={this.clickOnArticle}>
					<h2>{this.props.data.title}</h2>
				</div>
				<div className="rappi__article-content">
					<figure className="rappi__article-image">
						<img src={this.props.data.image} />
					</figure>
					<p>{this.props.data.content}</p>
				</div>
			</div>
		);
	}
});

module.exports = Article;
