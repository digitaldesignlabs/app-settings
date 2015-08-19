# app-settings

>*Simple access to settings for your node application*

This is a simple module which gives access to a configuration file for a node application, either in YAML, JSON or INI format.

## Install

Install with [npm](https://npmjs.org/package/app-settings)

```bash
npm install app-settings
```


## YAML Example

settings.yml:
```yml
auth:
    username: mike
    password: mysecret
```

main.js:
```js
var settings = require("app-settings");
console.log(settings.auth.username); // mike
```


## INI Example

settings.ini:
```ini
[auth]
username = mike
password = mysecret
```

main.js:
```js
var settings = require("app-settings");
console.log(settings.auth.username); // mike
```


## JSON Example

settings.json:
```json
{
    "auth": {
        "username": "mike",
        "password": "mysecret"
    }
}
```

main.js:
```js
var settings = require("app-settings");
console.log(settings.auth.username); // mike
```


## Custom Settings File

config.json:
```json
{
    "auth": {
        "username": "mike",
        "password": "mysecret"
    }
}
```

main.js:

```js
var config = require("app-settings")("config.json");
console.log(config.auth.username); // mike
```

## License

CC0 (PUBLIC DOMAIN)

> <small>really, it's too simple to qualify for copyright, no?</small>
