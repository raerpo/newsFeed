var React = require('react');
var ReactDOM = require('react-dom');
var NewsFeed = require('./components/news-feed.jsx');

var urlData = '';
//Ejemplo con API REST
//var urlData = 'http://www.mocky.io/v2/577495e90f00009811597bab';
//Si el urlData esta vacio, se va a usar el mockup data

ReactDOM.render(<NewsFeed urlData={urlData} />, document.getElementsByClassName('js-rappi')[0]);
