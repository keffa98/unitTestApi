import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier

describe('get/post /book', () => {
	beforeEach(() => {
		resetDatabase(path.join(__dirname, '../data/books.json'), {
			books : []
		});
	});

	it('response body is an object', (done) => {
		chai.request(server)
			.get('/book')
			.end(function (err, res) {
				expect(res.body).to.be.an('object');
				done();
			});
	});

	it('get resp status equal 200', (done) => {
		chai.request(server)
			.get('/book')
			.end(function (err, res) {
				expect(res).to.have.status(200);
				done();
			});
	});

	it('keys books is an array', (done) => {
		chai.request(server)
			.get('/book')
			.end(function (err, res) {
				expect(res.body.books).to.be.an('array');
				done();
			});
	});

	it('array books is equal to 0', (done) => {
		chai.request(server)
			.get('/book')
			.end(function (err, res) {
				expect(res.body.books).to.have.lengthOf(0);
				done();
			});
	});

	it('post resp status equal 200', (done) => {
		chai.request(server)
			.post('/book')
			.end(function (err, res) {
				expect(res).to.have.status(200);
				done();
			});
	});

	it('book successfully added', (done) => {
		chai.request(server)
			.post('/book')
			.end(function (err, res) {
				expect(res.body.message).to.be.a('string','book successfully added');
				done();
			});
	});

});
