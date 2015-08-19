/*jslint node: true, maxlen: 120 */
/*global it */

"use strict";

var assert = require("assert"),
    settings = require("../lib/settings");

// By default, we should find settings.yml
it('should load a default yml file', function () {
    assert.strictEqual(settings.application.type, "yaml");
});

// Specify we want settings.ini
it('should load a custom ini file', function () {
    assert.strictEqual(settings("settings.ini").application.type, "ini");
});

// Specify we want settings.json
it('should load a custom json file', function () {
    assert.strictEqual(settings("settings.json").application.type, "json");
});

// Specify by want settings.yml
it('should load a custom yml file', function () {
    assert.strictEqual(settings("settings.yml").application.type, "yaml");
});

// Check if we error for a bogus file
it("should return empty object looking for an absent file", function () {
    assert.deepEqual(settings("does_not_exist.ini"), {});
});

// Check for unparsable file
it("should return empty object looking for an unsupported file", function () {
    assert.deepEqual(settings("settings.csv"), {});
});
