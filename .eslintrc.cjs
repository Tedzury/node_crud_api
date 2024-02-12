module.exports = {
    "env": {
        "node": true
    },
    "root": true,
    "plugins": ["@typescript-eslint/eslint-plugin", "import", "simple-import-sort"],
    "extends": [
        "plugin:prettier/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "ignorePatterns": ["*.config.js"],
    "rules": {
        "semi": 0
    }
}
