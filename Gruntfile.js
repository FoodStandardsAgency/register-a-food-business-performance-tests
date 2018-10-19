module.exports = function(grunt) {
    pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
        sonarRunner: {
            analysis: {
                options: {
                    debug: true,
                    separator: '\n',
                    sonar: {
                        host: {
                            url: 'http://localhost:9000'
                        },
                        projectKey: 'FSA_perf',
                        sources: '.',
                        sourceEncoding: 'UTF-8'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sonar-runner');
};
