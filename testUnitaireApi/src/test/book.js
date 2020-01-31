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

  describe('get /book', () => {
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


  });
