import Firebase from 'firebase';

const post = (url,  body) => fetch(url, {
	'method': 'POST', 
	'credentials': 'include',
	'body': JSON.stringify(body || {}),
	'headers': {
		'Content-type': 'application/json',
		'Accept': 'application/json'
	}
}).then(res => res.json());

// Create variable for each api call.
export const signin = (username, password) => post('/api/signin', { username, password });
export const signup = (username, password) => post('/api/signup', { username, password });
export const signout = () => post('/api/signout');

// Create a Firebase Instance.
const firebasePage = 'https://wicker-dimitar.firebaseio.com/pages';
export const pages = new Firebase(firebasePage);

