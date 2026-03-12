pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/raj245200/calculator.git'
            }
        }

        stage('Install Node Dependencies and list all files') {
            steps {
                bat 'npm install'
                bat 'dir'
            }
        }

        stage('Build React App and Run') {
            steps {
                bat 'npm run build'
            }
        }
    }
}