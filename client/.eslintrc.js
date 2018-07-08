module.exports = {
    "extends": [
        "airbnb",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "env": {
        "node": true,
        "es6": true,
        "browser": true,
    },
    "rules": {
        "id-length": 0,
        "no-console": 0,
        "no-unused-vars": [1, {"vars": "local", "args": "none"}],
        "strict": 0,
        "arrow-body-style": 0,       
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], 
        "react/jsx-one-expression-per-line": 0,
    },    
    "plugins": [
        "react"
    ],
    "globals": {
        "React": true,
        "fbq": true,
        "amplitude": true
    }
};