module.exports = {
    "projects": [
        {
            "displayName": "test",
            "moduleFileExtensions": [
                "js",
                "json",
                "sfc"
            ],
            "transform": {
                "^.+\\.sht$": "sham-ui-templates-jest-preprocessor",
                "^.+\\.sfc$": "sham-ui-templates-jest-preprocessor",
                "^.+\\.js$": "babel-jest"
            },
            "collectCoverageFrom": [
                "src/*.js"
            ],
            "testURL": "http://sham-ui-test-helpers.example.com",
            "testPathIgnorePatterns": [
                "<rootDir>/node_modules/",
                "<rootDir>/__tests__/setup-jest.js"
            ],
            "setupFilesAfterEnv": [
                "<rootDir>/__tests__/setup-jest.js"
            ]
        },
        {
            "runner": "jest-runner-eslint",
            "displayName": "lint",
            "testMatch": [
                "<rootDir>/src/*.js",
                "<rootDir>/__tests__/**/*.js"
            ]
        }
    ]
};
