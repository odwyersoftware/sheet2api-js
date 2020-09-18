// Run npm run build before npm test
const Sheet2API = require('../../build/sheet2api-js');
const MockXMLHttpRequest = require('mock-xmlhttprequest');
const url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';
const auth_user = 'bob'
const auth_pass = 'superSecure';

test('read', async () => {
  const expected = [{ 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' }, { 'Favourite Thing': 'Chasing Rabbits', 'Image': 'Elmer.png', 'Name': 'Elmer Fudd' }, { 'Favourite Thing': 'Acting', 'Image': 'Porky.png', 'Name': 'Porky Pig' }]
  const server = MockXMLHttpRequest.newServer({
    get: [url, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expected),
    }],
  }).install();

  const result = await Sheet2API.read(url);

  expect(result).toEqual(expected);
  server.remove();
});

test('read, with auth', async () => {
  const expected = [{ 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' }, { 'Favourite Thing': 'Chasing Rabbits', 'Image': 'Elmer.png', 'Name': 'Elmer Fudd' }, { 'Favourite Thing': 'Acting', 'Image': 'Porky.png', 'Name': 'Porky Pig' }]
  const server = MockXMLHttpRequest.newServer({
    get: [url, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${auth_user}:${auth_pass}`),
      },
      body: JSON.stringify(expected),
    }],
  }).install();

  const result = await Sheet2API.read(url, {auth: [auth_user, auth_pass]});

  expect(result).toEqual(expected);
  expect(server._requests[0].headers).toEqual({
    'content-type': 'application/json; charset=UTF-8',
    'authorization': 'Basic ' + btoa(`${auth_user}:${auth_pass}`),
  })
  server.remove();
});

test('read, with sheet specified', async () => {
  const expected = [{ 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' }, { 'Favourite Thing': 'Chasing Rabbits', 'Image': 'Elmer.png', 'Name': 'Elmer Fudd' }, { 'Favourite Thing': 'Acting', 'Image': 'Porky.png', 'Name': 'Porky Pig' }]
  const server = MockXMLHttpRequest.newServer({
    get: [url + 'Sheet1/', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expected),
    }],
  }).install();

  const result = await Sheet2API.read(url, { sheet: 'Sheet1' });

  expect(result).toEqual(expected);
  server.remove();
});

test('read with search query', async () => {
  const expected = [{ 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' }];
  const server = MockXMLHttpRequest.newServer({
    get: [url + '?Name=Bugs%20Bunny', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expected),
    }],
  }).install();

  const result = await Sheet2API.read(url, { query: { 'Name': 'Bugs Bunny' } });

  expect(result).toEqual(expected);
  server.remove();
});

test('read with search query, with sheet specified', async () => {
  const expected = [{ 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' }];
  const server = MockXMLHttpRequest.newServer({
    get: [`${url}Sheet1/?Name=Bugs%20Bunny`, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expected),
    }],
  }).install();

  const result = await Sheet2API.read(url, { sheet: 'Sheet1', query: { 'Name': 'Bugs Bunny' } });

  expect(result).toEqual(expected);
  server.remove();
});

test('write a new row', async () => {
  const new_row_data = { 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' };
  const server = MockXMLHttpRequest.newServer({
    post: [url, {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new_row_data),
    }],
  }).install();

  const result = await Sheet2API.write(url, {}, new_row_data);

  expect(result).toEqual(new_row_data);
  server.remove();
});

test('write a new row, with auth', async () => {
  const new_row_data = { 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' };
  const server = MockXMLHttpRequest.newServer({
    post: [url, {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new_row_data),
    }],
  }).install();

  const result = await Sheet2API.write(url, {auth: [auth_user, auth_pass]}, new_row_data);

  expect(result).toEqual(new_row_data);
  expect(server._requests[0].headers).toEqual({
    'content-type': 'application/json; charset=UTF-8',
    'authorization': 'Basic ' + btoa(`${auth_user}:${auth_pass}`),
  })
  server.remove();
});

test('write a new row, with sheet specified', async () => {
  const new_row_data = { 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' };
  const server = MockXMLHttpRequest.newServer({
    post: [`${url}Sheet1/`, {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new_row_data),
    }],
  }).install();

  const result = await Sheet2API.write(url, { sheet: 'Sheet1' }, new_row_data);

  expect(result).toEqual(new_row_data);
  server.remove();
});


test('update an existing row', async () => {
  const update_row_data = { 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' };
  const server = MockXMLHttpRequest.newServer({
    put: [url, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update_row_data),
    }],
  }).install();

  const result = await Sheet2API.update(url, {}, update_row_data);

  expect(result).toEqual(update_row_data);
  server.remove();
});


test('update an existing row, with sheet specified', async () => {
  const update_row_data = { 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' };
  const server = MockXMLHttpRequest.newServer({
    put: [`${url}Sheet1/`, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update_row_data),
    }],
  }).install();

  const result = await Sheet2API.update(url, { sheet: 'Sheet1' }, update_row_data);

  expect(result).toEqual(update_row_data);
  server.remove();
});


test('update an existing row, with auth', async () => {
  const update_row_data = { 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' };
  const server = MockXMLHttpRequest.newServer({
    put: [url, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update_row_data),
    }],
  }).install();

  const result = await Sheet2API.update(url, {auth: [auth_user, auth_pass]}, update_row_data);

  expect(result).toEqual(update_row_data);

  expect(server._requests[0].headers).toEqual({
    'content-type': 'application/json; charset=UTF-8',
    'authorization': 'Basic ' + btoa(`${auth_user}:${auth_pass}`),
  })
  server.remove();
});

// test('update partially an existing row', async () => {
//   const update_row_data = { 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' };
//   const server = MockXMLHttpRequest.newServer({
//     patch: [url, {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(update_row_data),
//     }],
//   }).install();

//   const result = await Sheet2API.updatePartial(url, {}, update_row_data);

//   expect(result).toEqual(update_row_data);
//   server.remove();
// });


// test('update partially an existing row, with sheet specified', async () => {
//   const update_row_data = { 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' };
//   const server = MockXMLHttpRequest.newServer({
//     patch: [`${url}Sheet1/`, {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(update_row_data),
//     }],
//   }).install();

//   const result = await Sheet2API.updatePartial(url, { sheet: 'Sheet1' }, update_row_data);

//   expect(result).toEqual(update_row_data);
//   server.remove();
// });


// test('update partially an existing row, with auth', async () => {
//   const update_row_data = { 'Favourite Thing': 'Carrots1', 'Image': 'Bugs.png', 'Name': 'Bugs Bunny' };
//   const server = MockXMLHttpRequest.newServer({
//     patch: [url, {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(update_row_data),
//     }],
//   }).install();

//   const result = await Sheet2API.updatePartial(url, {auth: [auth_user, auth_pass]}, update_row_data);

//   expect(result).toEqual(update_row_data);

//   expect(server._requests[0].headers).toEqual({
//     'content-type': 'application/json; charset=UTF-8',
//     'authorization': 'Basic ' + btoa(`${auth_user}:${auth_pass}`),
//   })
//   server.remove();
// });
