pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/raj245200/calculator.git'
            }
        }

        stage('Install Node Dependencies') {
            agent { label 'ai' }
            steps {
                bat 'npm install'
                bat 'dir'
                mail bcc: '', body: 'Success', cc: '', from: '', replyTo: '', subject: 'Jenkins pull', to: 'rajtanishk24520@gmail.com'
            }
        }

        stage('Build React App and Run') {
            steps {
                bat 'npm run build'
            }
        }
    }
}