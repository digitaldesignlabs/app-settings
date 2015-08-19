/*jslint node: true, stupid: true, maxlen: 120 */

/**
 * Provides easy access to a settings file.
 *
 * @author Mike Hall <mikehall314@gmail.com>
 * @license CC0
 */

"use strict";

var fs = require("fs"),
    path = require("path"),
    extend = require("lodash.assign"),
    isEmpty = require("lodash.isempty"),
    settings,
    candidates;

/**
 * Loads a settings file with the appropriate parser
 * @param {string} filename - The name of the settings file to load
 * @returns {object} Settings hash
 */
function load(filename) {

    // We use the file extension to decide how to parse it
    var ext = path.extname(filename).toLowerCase();

    // Yaml
    if (ext === ".yml" || ext === ".yaml") {
        return require("js-yaml").safeLoad(fs.readFileSync(filename, "utf8"));
    }

    // INI
    if (ext === ".ini") {
        return require("ini").parse(fs.readFileSync(filename, 'utf-8'));
    }

    // JSON
    if (ext === ".json") {
        return require(filename);
    }

    // I got nothing
    return {};
}

/**
 * Ascends the filesystem hierarchy, looking for the specified file
 * @param {string} filename - Name of the settings file to seek
 * @return {object} Settings hash, or false on error
 */
function search(filename) {

    var candidate,

    // Start looking from the same folder as the script
    // we are executing - this will often by the application route.
        candidatePath = path.dirname(process.argv[1]),

    // Normalise the file by stripping out any path
        basename = path.basename(filename);

    // If we hit the root, give up.
    while (candidatePath !== path.resolve("/")) {

        // If the file exists in this directory, where would it be?
        candidate = path.resolve(candidatePath, basename);
        if (fs.existsSync(candidate)) {
            return load(candidate);
        }

        // Move up the directory tree
        candidatePath = path.dirname(candidatePath);
    }

    // Give up.
    return {};
}

// Be default, we look for a file called settings.x, where x is either
// a yaml file, an ini file or a JSON file
candidates = ["settings.ini", "settings.json", "settings.yaml", "settings.yml"];
settings = (function loop() {

    if (candidates.length === 0) {
        return {};
    }

    var test = search(candidates.pop());
    if (!isEmpty(test)) {
        return test;
    }

    return loop();

}());

// Make the settings properties of the search function,
// and then return the lot -- so users can either call
// what we return, or just access the properties.
module.exports = extend(search, settings || {});
