const { Observable, ajax: { ajax } } = rxjs;

const getTodoObs = ajax('https://jsonplaceholder.typicode.com/todos/1');

getTodoObs.subscribe(resp => console.log('response', resp.response));

// important: subscribing again initiates a new HTTP request!
getTodoObs.subscribe(resp => console.log('response of second subscribe', resp.response));