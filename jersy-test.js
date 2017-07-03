
const assert = require( "assert" );
const jersy = require( "./jersy.js" );

assert.equal( jersy( "./test.json", true ), JSON.stringify( { "hello": "world" }, null, "\t" ), "should be equal" );

jersy( "./test.json" )
	( function done( error, result ){

		assert.equal( result, JSON.stringify( { "hello": "world" }, null, "\t" ), "should be equal" );

	} );

console.log( "ok" );
