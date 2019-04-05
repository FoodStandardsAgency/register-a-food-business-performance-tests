#!/usr/bin/env groovy

node() {
    def docker_tag = 'fsa_perf:latest'
    def PWD = pwd()

    properties([
        // adds job parameters within jenkinsfile
        parameters([
          choice(
                  choices: ["test", "staging"].join("\n"),
                  description: 'Environment to run',
                  name: 'Environment'
          ),
          choice(
                choices: ["Baseline", "Soak"].join("\n"),
                description: 'Type to run',
                name: 'TestType'
          ),
          choice(
                  choices: ["360", "3600"].join("\n"),
                  description: 'Duration to run',
                  name: 'Duration'
          ),
          choice(
                choices: ["10", "30"].join("\n"),
                description: 'Think time',
                name: 'Thinktime'
          )

        ]),
        disableConcurrentBuilds()
    ])

      try {
        stage('Clean workspace')
            deleteDir()
        stage('Build Repo')
            checkout scm
            withEnv(["APISECRET=${env.FRONT_END_SECRET}",
                        "QAKEY='${env.QA_KEY_DECODED}'",
                        "Duration='${env.Duration}'",
                        "Thinktime='${env.Thinktime}'",
                        "ENVIRONMENT=${env.Environment}"])
                        {
                            sh "docker build -t ${docker_tag} \
                            --build-arg APISECRET=$APISECRET \
                            --build-arg QAKEY=$QAKEY \
                            --build-arg DURATION=$Duration \
                            --build-arg THINKTIME=$Thinktime \
                            --build-arg ENVIRONMENT=$ENVIRONMENT \
                            -f Dockerfile ."
                        }
                    sh "docker tag fsa_perf:latest fsa_perf:latest"

        stage('Run Tests')
             switch (params.TestType) {
                 case "Baseline":
                     sh "mkdir reports"
                     sh "docker run --mount type=bind,source=${PWD}/reports,target=/mnt ${docker_tag}"
                     break
                 case "Soak":
                     sh "docker-compose up"
                     break
                    }
         stage "Archive build"
             archiveArtifacts artifacts: '**/*'

      } catch(err) {
           echo "Build failed, see logs for details"
           throw(err)
       } finally {
            stage('Publish reports')
                echo "current dir  - ${PWD}"
                publishHTML (target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: true,
                  keepAll: true,
                  reportDir: 'reports',
                  reportFiles: 'report.json.html',
                  reportName: "Load Test Report"
                ])
            stage('Archive reports')
                archiveArtifacts 'reports/report.json.html'
            stage('Clear tests')
                sh "docker rmi -f ${docker_tag}"
                sh "yes | docker system prune"
            }
       }

