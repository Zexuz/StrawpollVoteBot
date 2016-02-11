"use strict";

var request = require('request');

class Proxy {

    constructor(ip, port, strawpoll) {
        this._ip = ip;
        this._port = port;
        this._strawpoll = strawpoll;
    }

    get ip() {
        return this._ip;
    }

    get port() {
        return this._port;
    }

    doVote(callback) {
        var options = {
            method: 'post',
            body: this._strawpoll,
            json: true,
            url: "http://strawpoll.me/api/v2/votes",
            proxy: "http://" + this.ip + ":" + this.port
        };

        request(options,Proxy._handelResponse.bind(null,callback));
    }


    static _handelResponse(callback, error, response, body) {
        if(error || response.statusCode !== 201){
            if(error) console.log(error);
            return;
        }
        callback(null);
    }
}

module.exports = Proxy;