import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';
import { get } from 'https';
import { REPL_MODE_SLOPPY } from 'repl';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier

it('test api call' , function(done) {
    chai.request('http://localhost:8080').get('/book').end(function(err, res) {
              expect(res).to.have.status(200);
              done();                               
            });
})


describe('unit test first serie', () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    it("response ok with get request" , function(done) {
        
        nock("http://localhost:8080")
        .get('/book')
        .reply(200, {"book": []})

        chai.request('http://localhost:8080')
        .get('/book').end(function(err , res) { 
            expect(res.status).to.equal(200);
            expect(res.body.book).to.be.an('Array');

            done();
    })
})

    it("response ok with post request" , function(done) {
        nock("http://localhost:8080")

        .post('/book')

        .reply(200, {
            "status": 200,
            "message": "book added succesfully"

        })

        chai.request('http://localhost:8080')
        .post('/book').end(function(err , res) { 
            expect(res.body.status).to.equal(200);
            expect(res.body.message).to.equal('book added succesfully');

            done();

        })

    })


    it("response ok with put request" , function(done){
        nock("http://localhost:8080")

        .put('/book')

        .reply(200, {
            "status": 200,
            "message": "book updated succesfully"

        })

        chai.request('http://localhost:8080')
        .put('/book').end(function(err , res) { 
            expect(res.body.status).to.equal(200);
            expect(res.body.message).to.equal('book updated succesfully');

            done();

        })
    })


    it("response ok with delete request" , function(done){
        nock("http://localhost:8080")

        .delete('/book')

        .reply(200, {
            "status": 200,
            "message": "book deleted succesfully"
        })

        chai.request('http://localhost:8080')
        .delete('/book').end(function(err , res) { 
            expect(res.body.status).to.equal(200);
            expect(res.body.message).to.equal('book deleted succesfully');

            done();

        })
    })


})

describe('unit test second serie', () => { 

    beforeEach(() => {
        nock.cleanAll();
    });

    it("response ok with get request" , function(done) {
        
        nock("http://localhost:8080")
        .get('/book')
        .reply(400, {"message": "error fetching book"})

        chai.request('http://localhost:8080')
        .get('/book').end(function(err , res) { 
            expect(res.status).to.equal(400);
            expect(res.body.message).to.be.equal('error fetching book');

            done();
    })
})

    it("response ok with post request" , function(done) {
        nock("http://localhost:8080")

        .post('/book')

        .reply(400, {
            "status": 400,
            "message": "error adding book"

        })

        chai.request('http://localhost:8080')
        .post('/book').end(function(err , res) { 
            expect(res.body.status).to.equal(400);
            expect(res.body.message).to.equal('error adding book');

            done();

        })

    })


    it("response ok with put request" , function(done){
        nock("http://localhost:8080")

        .put('/book')

        .reply(400, {
            "status": 400,
            "message": "error updating book"

        })

        chai.request('http://localhost:8080')
        .put('/book').end(function(err , res) { 
            expect(res.body.status).to.equal(400);
            expect(res.body.message).to.equal('error updating book');

            done();

        })
    })


    it("response ok with delete request" , function(done){
        nock("http://localhost:8080")

        .delete('/book')

        .reply(400, {
            "status": 400,
            "message": "error deleting book"
        })

        chai.request('http://localhost:8080')
        .delete('/book').end(function(err , res) { 
            expect(res.body.status).to.equal(400);
            expect(res.body.message).to.equal('error deleting book');

            done();

        })
    })


})
