pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/raj245200/calculator.git'
            }
        }

        stage('Install Node Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }
    }
}