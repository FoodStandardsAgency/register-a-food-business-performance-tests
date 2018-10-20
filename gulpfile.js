var gulp = require('gulp');
var sonarqubeScanner = require('sonarqube-scanner');

gulp.task('default', function(callback) {
    sonarqubeScanner({
        serverUrl : "https://sonarcloud.io",
        token : "85c1f1e88a882aaa5d7969106eda445211604c53",
        options : {
            "sonar.organization": "jennyoughibm-github"
        }
    }, callback);
});
