const path = require('path');
const Mocha = require('mocha');
const selenium = require('selenium-standalone');
const globby = require('globby');
const testFilesGlob = './specs/**/*.js';


const mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        reportFilename: 'results',
        quiet: true
    }
});

function stopSelenuim() {
    selenium.child.kill();
}

async function runTests() {
    const paths = await globby([testFilesGlob]);
    paths.forEach(function (filePath) {
        console.log(filePath);
        mocha.addFile(filePath);
    });

    mocha.run(function (exitCode) {
        stopSelenuim();
        if (exitCode !== 0) {
            process.exit(exitCode);
        }
    });
}

function runSeleniumTests() {
    selenium.install(
        {
            version: '3.9.0',
            baseURL: 'https://selenium-release.storage.googleapis.com',
            drivers: {
                chrome: {
                    version: '76.0.3809.126',
                    arch: process.arch,
                    baseURL: 'https://chromedriver.storage.googleapis.com'
                }
            },

            logger: msg => console.log(msg)
        },
        function (error) {
            if (error) {
                console.log("Selenium server is not started! 1" + error);
                return error;
            }
            selenium.start({
                version: '3.9.0',
                drivers: {
                    chrome: {
                        version: '76.0.3809.126'
                    }
                }
            }, (error, child) => {

                if (error) {
                    console.log("Selenium server is not started 2 !" + error);
                    return error;
                }
                console.log("Selenium server is started!")
                selenium.child = child;
                runTests();
            });
        }
    );
}
runSeleniumTests();
