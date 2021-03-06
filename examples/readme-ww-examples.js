const ww = require('../ww');

ww(function *() {
	// wait examples
	ww(110, 'wait1-1', (err, val) => console.log(val));
	ww(120, 'wait1-2')((err, val) =>  console.log(val));
	ww(130, 'wait1-3').then((val) =>  console.log(val));
	ww.wait(140, 'wait2-1', (err, val) =>  console.log(val));
	ww.wait(150, 'wait2-2')((err, val) =>  console.log(val));
	ww.wait(160, 'wait2-3').then((val) =>  console.log(val));

	yield ww(1000, 'promise1');
	// ww(generator or generator function)
	// returns Promise
	// use generator * and yield like async await
	ww(function *() {
		yield ww(100, 'promise1-1');
		console.log('promise1-1');
		yield ww(100, 'promise1-2');
		console.log('promise1-2');
		yield [ww(200, 'promise1-x'),
			ww(300, 'promise1-y'),
			ww(100, 'promise1-z')];
		console.log('promise1-3');
		yield {a:ww(200, 'promise1-a'),
			b:ww(300, 'promise1-b'),
			c:ww(100, 'promise1-c')};
		console.log('promise1-4');
	}).then(
		val => console.log('promise1-9', val),
		err => console.error(err));

	yield ww(1000, 'thunk1');
	// ww(generator or generator function)
	// returns Thunk
	// use generator * and yield like async await
	ww(function *() {
		yield ww(100, 'thunk1-1');
		console.log('thunk1-1');
		yield ww(100, 'thunk1-2');
		console.log('thunk1-2');
		yield [ww(200, 'thunk1-x'),
			ww(300, 'thunk1-y'),
			ww(100, 'thunk1-z')];
		console.log('thunk1-3');
		yield {a:ww(200, 'thunk1-a'),
			b:ww(300, 'thunk1-b'),
			c:ww(100, 'thunk1-c')};
		console.log('thunk1-4');
	})((err, val) => err ?
		console.error(err) :
		console.log('thunk1-9', val));

	yield ww(1000, 'array1');
	// ww(Array)
	// like Promise.all
	ww([ww(200, 'array1-1'),
		ww(300, 'array1-2'),
		ww(100, 'array1-3')]).then(
			val => console.log('array1-9', val),
			err => console.error(err));

	yield ww(1000, 'object1');
	// ww(Object)
	// like Promise.all
	ww({a: ww(200, 'object1-1'),
		b: ww(300, 'object1-2'),
		c: ww(100, 'object1-3')}).then(
			val => console.log('object1-9', val),
			err => console.error(err));
})();
