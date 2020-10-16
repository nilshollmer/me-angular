/**
 * Test for getting started with Selenium.
 */
"use strict";



var webdriver = require("selenium-webdriver");
var browser = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome())
    .build();

browser.get("http://localhost:4200/");

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
// 
// const {Builder, By, Key, until} = require('selenium-webdriver');
//
// (async function example() {
//     let driver = await new Builder().forBrowser('firefox').build();
//     try {
//         // Navigate to Url
//         await driver.get('https://www.google.com');
//
//         // Enter text "cheese" and perform keyboard action "Enter"
//         await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);
//
//         let firstResult = await driver.wait(until.elementLocated(By.css('h3>div')), 10000);
//
//         console.log(await firstResult.getAttribute('textContent'));
//     }
//     finally{
//         driver.quit();
//     }
// })();
