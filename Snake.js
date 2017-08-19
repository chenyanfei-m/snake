var eat = document.getElementById( "eat" );
var diem = document.getElementById( "die" );
var music = document.getElementById( "music" );
var difficulty = ["★", "★", "★", "★", "★", "☆", "☆", "☆", "☆", "☆"];
eat.volume = 0.3;
diem.volume = 0.3;
music.volume = 0.3;

var main1 = $( "#main" );
var arr = [250, 251, 252, 253, 254];
var clear1 = [];
var statuscode = 1;//状态码
var keystatus = 0;//按键状态,防止冲突

var touchObject = { x: 0 };
var dounce = {};

for ( var i = 0; i < 486; i++ ) {
	main1.append( "<div></div>" );
}

var clearInterval1 = function () {
	for ( var i = 0; i < clear1.length; i++ ) {
		clearInterval( clear1[i] );
	}
}//清空延时

var aaa = 1;
var time = 100;

var die = function () {
	var a = arr.lastIndexOf( arr[arr.length - 1], arr.length - 2 );
	var b = arr.indexOf( arr[0], 1 );
	if ( a != -1 || b != -1 ) {
		statuscode = 5;
		clearInterval1();
		music.pause();
		diem.play();
		$( "#center" ).animate( { left: 0 }, 500 );
	}
	if ( arr.length == 485 ) {
		alert( "恭喜通关!" );
	}
}//死亡检测

var eatFood = function () {
	if ( arr.indexOf( $( ".food" ).index() ) != -1 ) {
		arr.unshift( 2 * arr[0] - arr[1] );
		$( ".food" ).removeClass( "food" );
		$( "#score" ).html( "分数: " + ( arr.length - 5 ) );
		if ( $( ".food" ).length == 0 ) {
			food();
			eat.play();
			eat.onended = function () {
				music.play();
			}
		}
	}
}

var food = function () {
	var random1 = Math.floor( Math.random() * 486 );
	if ( arr.indexOf( random1 ) == -1 ) {
		$( "#main div" ).eq( random1 ).addClass( "food" )
	} else {
		food();
	}
}//食物生成
food();

var aValue = function ( val ) {
	if ( ( val ) < 0 ) {
		return 0 - val
	} else {
		return val
	}
}//绝对值

var render = function () {
	var a = arguments[0];
	for ( var j = 0; j < a.length; j++ ) {
		$( "#main div" ).eq( a[j] ).css( "background", "#66ccff" );
	};
}//渲染
render.status = true;

render( arr );


var mobile = false;
var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
if ( navigator ) {
	var agentsInfo = navigator.userAgent;
	for ( var i = 0; i < agents.length; i++ ) {
		if ( agentsInfo.indexOf( agents[i] ) > -1 ) {
			mobile = true;
			$( "#center p" )[0].innerHTML = "轻触屏幕重新开始游戏"
			$( "#header" )[0].innerHTML = "轻触屏幕开始游戏<br>左右滑动改变难度<br>通过手机水平位置的改变来控制贪吃蛇";
			break
		}
	}
}

$( document ).keydown( function ( event ) {
	if ( statuscode != 5 ) {
		music.play();
	}
	music.loop = true;

	switch ( event.keyCode ) {
		case 65:
			console.log( 'A' )
			break
		case 83:
			console.log( 'S' )
			break
		case 68:
			console.log( 'D' )
			break
		case 87:
			console.log( 'W' )
			break
		default:
			console.log( 'other' )
	}

	$( "#header" ).fadeOut( "100000" );
	$( "#score" ).show();
	if ( event.keyCode == 87 && statuscode != 2 && statuscode != 5 && keystatus == 0 && render.status ) {
		clearInterval1();
		statuscode = 4;
		keystatus = 1;
		render.status = false;
		var b1 = setInterval( function () {
			eatFood();
			var end = arr.shift();
			if ( arr[arr.length - 1] <= 26 ) {
				arr.push( arr[arr.length - 1] + 459 );
			} else {
				arr.push( arr[arr.length - 1] - 27 );
			}
			$( "#main div" ).eq( end ).css( "background", "#fff" );
			die();
			render( arr );
			render.status = true;
		}, time );
		clear1.push( b1 );
	}//top

	if ( event.keyCode == 83 && statuscode != 4 && statuscode != 5 && keystatus == 0 && render.status ) {
		clearInterval1();
		statuscode = 2;
		keystatus = 1;
		render.status = false;
		var c1 = setInterval( function () {
			eatFood();
			var end = arr.shift();
			if ( arr[arr.length - 1] >= 459 ) {
				arr.push( arr[arr.length - 1] - 459 );
			} else {
				arr.push( arr[arr.length - 1] + 27 );
			}
			$( "#main div" ).eq( end ).css( "background", "#fff" );
			die();
			render( arr );
			render.status = true;
		}, time );
		clear1.push( c1 );
	}//bottom

	if ( event.keyCode == 65 && statuscode != 1 && statuscode != 5 && keystatus == 0 && render.status ) {
		clearInterval1();
		statuscode = 3;
		keystatus = 1;
		render.status = false;
		var d1 = setInterval( function () {
			eatFood();
			var end = arr.shift();
			if ( arr[arr.length - 1] % 27 == 0 ) {
				arr.push( arr[arr.length - 1] + 26 );
			} else {
				arr.push( arr[arr.length - 1] - 1 );
			}
			$( "#main div" ).eq( end ).css( "background", "#fff" );
			die();
			render( arr );
			render.status = true;
		}, time );
		clear1.push( d1 );
	}//left

	if ( event.keyCode == 68 && statuscode != 3 && statuscode != 5 && keystatus == 0 && render.status ) {
		clearInterval1();
		statuscode = 1;
		keystatus = 1;
		render.status = false;
		var e1 = setInterval( function () {
			eatFood();
			var end = arr.shift();
			if ( arr[arr.length - 1] % 27 == 26 ) {
				arr.push( arr[arr.length - 1] - 26 );
			} else {
				arr.push( arr[arr.length - 1] + 1 );
			}
			$( "#main div" ).eq( end ).css( "background", "#fff" );
			die();
			render( arr );
			render.status = true;
		}, time );
		clear1.push( e1 );
	}//right

	if ( event.keyCode == 32 && parseInt( $( "#center" ).css( "left" ) ) == 0 ) {
		statuscode = 1;
		$( "#center" ).animate( { left: "-100%" }, 500 );
		for ( var i = 0; i < arr.length; i++ ) {
			$( "#main div" ).eq( arr[i] ).css( "background", "#fff" );
		}
		arr = [250, 251, 252, 253, 254];
		render( arr );
		$( "#score" ).html( "分数: 0" );
		$( ".food" ).attr( "class", "" );
		food();
	}

	if ( event.keyCode == 69 && aaa < 5 ) {
		aaa++;
		time = time - 10;
		var b = difficulty.slice( 5 - aaa, 10 - aaa ).join( " " );
		$( "#difficulty" ).html( "难度: " + b )
	}
	if ( event.keyCode == 81 && aaa > 1 ) {
		aaa--;
		time = time + 10;
		var b = difficulty.slice( 5 - aaa, 10 - aaa ).join( " " );
		$( "#difficulty" ).html( "难度: " + b )
	}

} );
$( document ).keyup( function ( event ) {
	if ( event.keyCode == 83 || event.keyCode == 65 || event.keyCode == 68 || event.keyCode == 87 ) {
		keystatus = 0;
	}
} )

function fireKeyEvent( el, evtType, keyCode ) {
	var doc = el.ownerDocument,
		win = doc.defaultView || doc.parentWindow,
		evtObj;
	if ( doc.createEvent ) {
		if ( win.KeyEvent ) {
			evtObj = doc.createEvent( 'KeyEvents' );
			evtObj.initKeyEvent( evtType, true, true, win, false, false, false, false, keyCode, 0 );
		}
		else {
			evtObj = doc.createEvent( 'UIEvents' );
			Object.defineProperty( evtObj, 'keyCode', {
				get: function () { return this.keyCodeVal; }
			} );
			Object.defineProperty( evtObj, 'which', {
				get: function () { return this.keyCodeVal; }
			} );
			evtObj.initUIEvent( evtType, true, true, win, 1 );
			evtObj.keyCodeVal = keyCode;
			if ( evtObj.keyCode !== keyCode ) {
				console.log( "keyCode " + evtObj.keyCode + " 和 (" + evtObj.which + ") 不匹配" );
			}
		}
		el.dispatchEvent( evtObj );
	}
	else if ( doc.createEventObject ) {
		evtObj = doc.createEventObject();
		evtObj.keyCode = keyCode;
		el.fireEvent( 'on' + evtType, evtObj );
	}
}

document.addEventListener( 'touchstart', function ( e ) {
	touchObject.x = e.changedTouches[0].clientX;
} );


document.addEventListener( 'touchend', function ( e ) {
	touchObject.x = touchObject.x - e.changedTouches[0].clientX;
	if ( touchObject.x > 0 ) {
		fireKeyEvent( document.documentElement, 'keydown', 81 );
		fireKeyEvent( document.documentElement, 'keyup', 81 )
	} else if ( touchObject.x < 0 ) {
		fireKeyEvent( document.documentElement, 'keydown', 69 );
		fireKeyEvent( document.documentElement, 'keyup', 69 )
	} else {
		if ( parseInt( $( "#center" ).css( "left" ) ) == 0 ) {
			fireKeyEvent( document.documentElement, 'keydown', 32 );
			fireKeyEvent( document.documentElement, 'keyup', 32 );
		}
	}
} )

document.documentElement.onclick = function () {
	fireKeyEvent( document.documentElement, 'keydown', 68 );
	fireKeyEvent( document.documentElement, 'keyup', 68 );
	dounce.begin = true;
}

window.addEventListener( 'deviceorientation', function ( e ) {
	if ( !!dounce.begin && parseInt( $( "#center" ).css( "left" ) ) !== 0 ) {
		if ( aValue( e.beta ) > aValue( e.gamma ) ) {
			if ( e.beta > 0 && dounce.id != 1 ) {
				fireKeyEvent( document.documentElement, 'keydown', 83 );
				fireKeyEvent( document.documentElement, 'keyup', 83 );
				dounce.id = 1
			}
			if ( e.beta < 0 && dounce.id != 2 ) {
				fireKeyEvent( document.documentElement, 'keydown', 87 );
				fireKeyEvent( document.documentElement, 'keyup', 87 );
				dounce.id = 2
			}
		}
		if ( aValue( e.beta ) < aValue( e.gamma ) ) {
			if ( e.gamma > 0 && dounce.id != 3 ) {
				fireKeyEvent( document.documentElement, 'keydown', 68 );
				fireKeyEvent( document.documentElement, 'keyup', 68 );
				dounce.id = 3
			}
			if ( e.gamma < 0 && dounce.id != 4 ) {
				fireKeyEvent( document.documentElement, 'keydown', 65 );
				fireKeyEvent( document.documentElement, 'keyup', 65 );
				dounce.id = 4
			}
		}//w87 s83 a65 d68
	}
} )