// Run npm run build before npm test
const Sheet2API = require('../../build/sheet2api-js');
const MockXMLHttpRequest = require('mock-xmlhttprequest');
const url = 'https://sheet2api.com/v1/FgI6zV8qT121/characters/';

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
