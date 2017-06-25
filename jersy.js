/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "jersy",
			"path": "jersy/jersy.js",
			"file": "jersy.js",
			"module": "jersy",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/jersy.git",
			"test": "jersy-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Read JSON files.

		Returns empty object string if file is empty.
	@end-module-documentation

	@include:
		{
			"calcify": "calcify",
			"falzy": "falzy",
			"kept": "kept",
			"lire": "lire",
			"protype": "protype",
			"zelf": "zelf"
		}
	@end-include
*/

const calcify = require( "calcify" );
const falzy = require( "falzy" );
const kept = require( "kept" );
const lire = require( "lire" );
const protype = require( "protype" );
const zelf = require( "zelf" );

const EMPTY_OBJECT = "{}";
const JSON_FILE_PATTERN = /\.json$/;

const jersy = function jersy( path, synchronous ){
	/*;
		@meta-configuration:
			{
				"path:required": "string",
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( falzy( path ) || !protype( path, STRING ) ){
		throw new Error( "invalid path" );
	}

	if( !JSON_FILE_PATTERN.test( path ) ){
		path = `${ path }.json`;
	}

	if( synchronous === true ){
		try{
			if( kept( path, READ, true ) ){
				try{
					return calcify( lire( path, true ) || EMPTY_OBJECT );

				}catch( error ){
					throw new Error( `cannot read json file, ${ error.stack }` );
				}

			}else{
				return EMPTY_OBJECT;
			}

		}catch( error ){
			throw new Error( `cannot read json file, ${ error.stack }` );
		}

	}else{
		let catcher = kept.bind( zelf( this ) )( path, READ )
			.then( function done( error, readable ){
				if( error instanceof Error ){
					return catcher.pass( new Error( `cannot read json file, ${ error.stack }` ), EMPTY_OBJECT );

				}else if( readable ){
					return lire( path )
						( function done( error, result ){
							if( error instanceof Error ){
								return catcher.pass( new Error( `cannot read json file, ${ error.stack }` ) );

							}else{
								return catcher.pass( null, calcify( result || EMPTY_OBJECT ) );
							}
						} );

				}else{
					return catcher.pass( null, EMPTY_OBJECT );
				}
			} );

		return catcher;
	}
};

module.exports = jersy;
