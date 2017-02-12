
const jersy = require( "./jersy.js" );

console.log( jersy( "./package.json", true ) );

jersy( "./package.json" )
	( function done( error, result ){
		console.log( arguments );
	} );

console.log( jersy( "./packages.json", true ) );
