pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/raj245200/calculator.git'
            }
        }

        stage('Install Node Dependencies and Run') {
            steps {
                bat 'npm install'
                bat 'npm start'
            }
        }

        stage('Build React App and Run') {
            steps {
                bat 'npm run build'
            }
        }
    }
}