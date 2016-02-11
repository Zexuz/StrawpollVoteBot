"use strict";

var Proxy = require('./Proxy');

var request = require('request');
var cheerio = require('cheerio');

class Proxies {
    constructor(strawpoll) {
        this._strawpoll = strawpoll;
        this.url = "http://checkerproxy.net/getProxy?date=";
    }

    get url() {
        return this._url;
    }

    set url(list) {
        this._url = list;
    }

    get proxyList() {
        return this._list;
    }

    set proxyList(list) {
        this._list = list;
    }

    getProxyList(callback) {
        let self = this;

        request(this.url + Proxies.getDate(), function (error, response, body) {

            if (error || response.statusCode != 200) {
                callback(err || response.statusCode);
                return;
            }

            var $ = cheerio.load(body);
            var list = $('center').find('ul').first();
            var proxyList = [];

            list = list.first().children();

            for (let i = 0; i < list.length; i++) {
                var whole = list[i].children[0].data;

                var index = whole.indexOf(':');

                var ip = whole.substring(0, index);
                var port = whole.substring(index + 1);

                proxyList.push(new Proxy(ip, port,self._strawpoll));
            }

            callback(null, proxyList);
        });
    }

    static getDate() {
        var date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() ) + "-" + date.getDate();
    }

}

module.exports = Proxies;