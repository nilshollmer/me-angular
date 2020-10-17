/**
 * Test for getting started with Selenium.
 */
"use strict";



var webdriver = require("selenium-webdriver");
var browser = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.firefox())
    .build();

    browser.get("https://me-angular.nilshollmer.me/");
    // browser.get("http://127.0.0.1:4200/");

// Two different ways to work with promises
// Way 1
let promise = browser.getTitle();

promise.then(function(title) {
    console.log(title);
});

// Way 2
browser.getTitle().then(function( title ) {
    console.log(title);
});

browser.quit();
