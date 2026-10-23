/**
 * Keyword n-gram density — editor analysis.
 *
 * Reads the content of the post currently being edited (block editor, classic
 * TinyMCE, or the plain textarea), counts repeated 1–5 word phrases, and shows
 * the results in the meta box. Everything runs in the browser; nothing is sent
 * anywhere.
 */
( function () {
	'use strict';

	var STOPWORDS = ( function () {
		var list = (
			'the a an and or of to in on for with at by from as is are was were be been being this ' +
			'that these those it its you your we our they their he she his her not no but if then so ' +
			'than too very just can will would should could do does did have has had ' +
			'i w z ze na do nie to się że a o jak dla po co ale czy jest są być ten ta te tego tej tym ' +
			'od za przy pod nad bez przez oraz lub albo już tylko bardzo też także gdy aby więc'
		).split( /\s+/ );
		var set = {};
		list.forEach( function ( w ) {
			if ( w ) {
				set[ w ] = true;
			}
		} );
		return set;
	}() );

	function normalize( text ) {
		return String( text || '' )
			.toLowerCase()
			.replace( /[^0-9a-ząćęłńóśźż\s]+/gi, ' ' )
			.replace( /\s+/g, ' ' )
			.trim();
	}

	function tokenize( text, removeStop ) {
		var tokens = normalize( text ).split( ' ' ).filter( function ( t ) {
			return t;
		} );
		if ( ! removeStop ) {
			return tokens;
		}
		return tokens.filter( function ( t ) {
			return ! STOPWORDS[ t ];
		} );
	}

	function countNgrams( tokens, n ) {
		var map = {};
		for ( var i = 0; i + n <= tokens.length; i++ ) {
			var gram = tokens.slice( i, i + n ).join( ' ' );
			map[ gram ] = ( map[ gram ] || 0 ) + 1;
		}
		return { map: map, total: Math.max( 1, tokens.length - n + 1 ) };
	}

	function stripHtml( html ) {
		var div = document.createElement( 'div' );
		div.innerHTML = String( html || '' );
		return div.textContent || div.innerText || '';
	}

	/* Pull the current post text from whichever editor is active. */
	function getPostText() {
		try {
			if ( window.wp && wp.data && wp.data.select( 'core/editor' ) ) {
				var content = wp.data.select( 'core/editor' ).getEditedPostContent();
				if ( content ) {
					return stripHtml( content );
				}
			}
		} catch ( e ) {}

		try {
			if ( window.tinymce && tinymce.get( 'content' ) && ! tinymce.get( 'content' ).isHidden() ) {
				return tinymce.get( 'content' ).getContent( { format: 'text' } );
			}
		} catch ( e ) {}

		var textarea = document.getElementById( 'content' );
		if ( textarea ) {
			return stripHtml( textarea.value );
		}
		return '';
	}

	function escapeHtml( s ) {
		return String( s ).replace( /[&<>"]/g, function ( c ) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ c ];
		} );
	}

	var lastResult = null;

	function analyze() {
		var sizes = Array.prototype.map.call(
			document.querySelectorAll( '.kngd-size:checked' ),
			function ( c ) {
				return parseInt( c.value, 10 );
			}
		);
		var resultsEl = document.getElementById( 'kngd-results' );
		var metaEl = document.getElementById( 'kngd-meta' );
		if ( ! sizes.length ) {
			metaEl.textContent = 'Pick at least one phrase length.';
			resultsEl.innerHTML = '';
			return;
		}

		var removeStop = document.getElementById( 'kngd-stop' ).checked;
		var minCount = parseInt( document.getElementById( 'kngd-min' ).value, 10 ) || 2;
		var tokens = tokenize( getPostText(), removeStop );

		if ( ! tokens.length ) {
			metaEl.textContent = 'No text found in this post yet.';
			resultsEl.innerHTML = '';
			return;
		}

		var result = { totalWords: tokens.length, sizes: {} };
		sizes.forEach( function ( n ) {
			var c = countNgrams( tokens, n );
			result.sizes[ n ] = Object.keys( c.map ).map( function ( g ) {
				return { phrase: g, count: c.map[ g ], pct: ( c.map[ g ] / c.total ) * 100 };
			} ).filter( function ( r ) {
				return r.count >= minCount;
			} ).sort( function ( a, b ) {
				return b.count - a.count || a.phrase.localeCompare( b.phrase );
			} ).slice( 0, 25 );
		} );

		lastResult = result;
		metaEl.textContent = 'Total words: ' + result.totalWords;
		renderTabs( sizes );
		showTab( sizes[ 0 ] );
	}

	function renderTabs( sizes ) {
		var tabs = document.getElementById( 'kngd-tabs' );
		tabs.innerHTML = '';
		sizes.forEach( function ( n, i ) {
			var t = document.createElement( 'span' );
			t.className = 'kngd-tab' + ( 0 === i ? ' active' : '' );
			t.textContent = n + '-word';
			t.setAttribute( 'data-n', n );
			t.addEventListener( 'click', function () {
				showTab( n );
			} );
			tabs.appendChild( t );
		} );
	}

	function showTab( n ) {
		Array.prototype.forEach.call( document.querySelectorAll( '.kngd-tab' ), function ( t ) {
			t.classList.toggle( 'active', parseInt( t.getAttribute( 'data-n' ), 10 ) === n );
		} );
		var rows = ( lastResult && lastResult.sizes[ n ] ) || [];
		var html = '<table class="kngd-table"><tr><th>phrase</th><th class="num">count</th><th class="num">%</th></tr>';
		if ( ! rows.length ) {
			html += '<tr><td colspan="3" class="kngd-muted">none above threshold</td></tr>';
		}
		rows.forEach( function ( r ) {
			html += '<tr><td>' + escapeHtml( r.phrase ) + '</td><td class="num">' + r.count +
				'</td><td class="num">' + ( Math.round( r.pct * 100 ) / 100 ) + '</td></tr>';
		} );
		html += '</table>';
		document.getElementById( 'kngd-results' ).innerHTML = html;
	}

	document.addEventListener( 'DOMContentLoaded', function () {
		var btn = document.getElementById( 'kngd-run' );
		if ( btn ) {
			btn.addEventListener( 'click', analyze );
		}
	} );
}() );
