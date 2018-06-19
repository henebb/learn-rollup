module.exports = {
    "plugins": ["jest"],
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
    },
    "globals": {
        "ENV": true,
        "process": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
    }
};