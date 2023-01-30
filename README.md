# Creating a FaaS using Node.js, Docker, KafkaJS and KeyCloack.

This project aims to:

- Create a FaaS application using Node.js.
- Containerize the application using Docker.
- Implement event-driven communication using KafkaJS.
- Secure the application with Keycloak.

## System requirements 🖥️

Install `Node.js` and `npm`. In Debian based distributions, use apt package manager.

```
$ sudo apt install node
```

> To learn more, check out how to [download NodeJS](https://nodejs.org/en/download/).

Install `docker` and `docker-compose`. Instructions on how to do it in [docs.docker.com](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository). **Make sure to enable running docker as non root**.

## Installation 🛠️

Clone the github repo.

```
$ git clone https://github.com/SimonBC3/SAD_practicas
```

Navigate into the projects main folder.

```
$ cd SAD_practicas/
```

Deploy the infrastructure using the supplied script.

```
$ ./launch.sh
```

## Usage 📑
