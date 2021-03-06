/**
 * Test for getting started with Selenium.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const By = webdriver.By;

let browser;


function goToNavLink(target) {
    browser.findElement(By.linkText(target)).then(function(element) {
        element.click();
    });
}

function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
        assert.ok(url.endsWith("/" + target));
    });
}


test.describe("Me-angular", function() {
    this.timeout(0);

    beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();

        browser.get("https://me-angular.nilshollmer.me/");
        // browser.get("http://127.0.0.1:4200/");
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });

    test.it("Test go to report 1", async function(done) {
        goToNavLink("Reports");
        await browser.findElement(By.id("report-1")).click();

        matchUrl("reports/week/1");

        done();
    });

    test.it("Test go to register", function(done) {
        goToNavLink("Login");
        goToNavLink("Register");

        matchUrl("auth/register");

        done();
    });

    test.it("Test go to login", async function(done) {
        const name = "admin"
        const pass = "test"

        goToNavLink("Login");
        matchUrl("auth/login");

        await browser.findElement(By.name('formName')).sendKeys(name);
        await browser.findElement(By.name('formPassword')).sendKeys(pass);

        await browser.findElement(By.name("login")).click();

        done();
    });

});
