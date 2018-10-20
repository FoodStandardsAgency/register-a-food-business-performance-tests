var gulp = require('gulp');
var sonarqubeScanner = require('sonarqube-scanner');

task = gulp.task('default', function (callback) {
    const sonar_token = process.env.SONARTOKEN;
    const sonar_org = process.env.SONARORGANISATION;
    sonarqubeScanner({
        serverUrl: "https://sonarcloud.io",
        token: sonar_token,
        options: {
            "sonar.organization": sonar_org
        }
    }, callback);
});
