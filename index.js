"use strict";

var Proxies = require('./lib/Proxies');

var strawpoll = {pollId: 6784740, votes: [1]};

var proxies = new Proxies(strawpoll);


proxies.getProxyList(function (err, list) {
    if (err) {
        console.log(err);
        return;
    }
    proxies.proxyList = list;
    console.log(list.length);


    var index = 0;
    setInterval(function () {
        list[index++].doVote(function () {

        });
        console.log(index);

    }, 10);


});

