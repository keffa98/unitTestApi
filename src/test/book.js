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

			     expect(res.body).to.be.an('object');
			     done();
			  });
	});
	
  });

// Seconde serie de test (Mocked Database)
  describe('put /book', () => {
    beforeEach(() => {
    	resetDatabase(path.join(__dirname, '../data/books.json'), {
    		books: [
				{
				id: '0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9',
				title: 'Coco raconte Channel 2',
				years: 1990,
				pages: 400
				}
			]
    	});
    });

	//Que la réponse ait un status 200
    it('response status equal 200', (done) => {
		chai.request(server)
			.put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
			.end(function (err, res) {
			     expect(res.status).to.equal(200);
			     done();
			  });
	});
	
	//Que la réponse ait message succesfull
    it('response message -> book successfully updated ', (done) => {
		chai.request(server)
			.put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
			.end(function (err, res) {
				 expect(res.body.message).to.be.a('string','book successfully updated');
			     done();
			  });
    });


  });



  describe('delete /book', () => {
    beforeEach(() => {
    	resetDatabase(path.join(__dirname, '../data/books.json'), {
    		books: [
				{
				id: '0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9',
				title: 'Coco raconte Channel 2',
				years: 1990,
				pages: 400
				}
			]
    	});
    });

	//Que la réponse ait un status 200
    it('response status equal 200', (done) => {
		chai.request(server)
			.delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
			.end(function (err, res) {
			     expect(res.status).to.equal(200);
			     done();
			  });
	});

	//Que la réponse ait message succesfull
	it('response message -> book successfully deleted ', (done) => {
		chai.request(server)
			.delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
			.end(function (err, res) {
					expect(res.body.message).to.be.a('string','book successfully deleted');
					done();
				});
	});

});


describe('get /book', () => {
    beforeEach(() => {
    	resetDatabase(path.join(__dirname, '../data/books.json'), {
    		books: [
				{
				id: '0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9',
				title: 'Coco raconte Channel 2',
				years: 1990,
				pages: 400
				}
			]
    	});
    });

	
	//Que la réponse ait un status 200
	it('response status equal 200', (done) => {
		chai.request(server)
			.get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
			.end(function (err, res) {
				expect(res.status).to.equal(200);

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


	//Que la réponse ait message book fetch
	it('response message -> book fetch ', (done) => {
		chai.request(server)
			.get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
			.end(function (err, res) {
					expect(res.body.message).to.be.a('string','book fetch');
					done();
				});
	});

    // Que la clé book dans l’objet body soit un objet
	it('response id is an object', (done) => {
		chai.request(server)
			.get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
			.end(function (err, res) {
				 expect(res.body.book).to.be.an('object');
				 
			     done();
			  });
	});

	 // Que la clé years dans l’objet book soit un nombre
	 it('response years is a number', (done) => {
		chai.request(server)
			.get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
			.end(function (err, res) {
				 expect(res.body.book.years).to.be.an('number');
				 
			     done();
			  });
	});


	 // Que la clé pages dans l’objet book soit un nombre
	 it('response pages is a number', (done) => {
		chai.request(server)
			.get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
			.end(function (err, res) {
				 expect(res.body.book.pages).to.be.an('number');
				 
			     done();
			  });
	});


		//Que la clé title dans l’objet book soit égale a la clé title de la database mocké
		it('objet title book -> la clé title de la database mocké', (done) => {
			chai.request(server)
				.get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
				.end(function (err, res) {
					expect(res.body.book.title).to.equal('Coco raconte Channel 2');
					done();
				});
		});


		//Que la clé years dans l’objet book soit égale a la clé years de la database mocké
		it('objet years book -> la clé years de la database mocké', (done) => {
			chai.request(server)
				.get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
				.end(function (err, res) {
					expect(res.body.book.years).to.equal(1990);
					done();
				});
		});


		//Que la clé pages dans l’objet book soit égale a la clé pages de la database mocké
		it('objet pages book -> la clé pages de la database mocké', (done) => {
			chai.request(server)
				.get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')  
				.end(function (err, res) {
					expect(res.body.book.pages).to.equal(400);
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

