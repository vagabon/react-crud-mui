pipeline {
    agent {
        label 'slave-linux'
    }

    environment {
        HOME = '.'
    }

    stages {
        stage('Installation dependances') {
            agent {
				docker {
					label 'slave-linux'
					image 'di-codep/codep-java11-npm8-node18:latest'
					args ' -v ${DATA_CACERTS}:${CACERTS_URL}  -i --entrypoint='
                    reuseNode true
				}
			}

            steps {
                retry(3){
                    sh '''
                        npm ci
                    '''
                }
            }
        }

        stage('Build project') {
            agent {
				docker {
					label 'slave-linux'
					image 'di-codep/codep-java11-npm8-node18:latest'
					args ' -v ${DATA_CACERTS}:${CACERTS_URL}  -i --entrypoint='
                    reuseNode true
				}
			}

            steps {
                sh '''
                    npm run ci
                '''
            }
        }

        stage('Analyse SonarQube du projet') {
            agent {
                docker {
                      label 'slave-linux'
                      image 'di-codep/codep-sonar-scanner:latest'
                      args ' -v ${DATA_CACERTS}:${CACERTS_URL}  -i --entrypoint='
                      reuseNode true
                }
            }

            steps {
                withSonarQubeEnv('SonarQubeCodeP') {
                    sh 'sonar-scanner'
                }
            }
        }
    }
}
