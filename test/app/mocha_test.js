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

// Test suite
test.describe("Me-angular", function() {
    this.timeout(0);
    
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();

        browser.get("http://localhost:4200/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });


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

    test.it("Test go to report 1", function(done) {
        goToNavLink("Reports");
        browser.findElement(By.id("report-1")).click();

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
