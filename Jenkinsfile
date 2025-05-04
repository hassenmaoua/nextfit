pipeline {
  agent any
  environment {
    DOCKER_REGISTRY = 'docker.io/hassenmaoua'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/hassenmaoua/nextfit.git'
      }
    }

    stage('Build Backend') {
      steps {
        dir('nextfit-backend') {
          sh 'mvn clean install -DskipTests'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('nextfit-ng') {
          sh 'npm install'
          sh 'ng build --configuration production'
        }
      }
    }

    stage('Dockerize') {
      steps {
        sh 'docker-compose -f docker/docker-compose.yml build'
        sh 'docker tag nextfit-backend $DOCKER_REGISTRY/nextfit-backend:latest'
        sh 'docker push $DOCKER_REGISTRY/nextfit-backend:latest'
      }
    }

    stage('Deploy to K8s') {
      steps {
        sh 'kubectl apply -f k8s/'
      }
    }
  }
}
