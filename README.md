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

Using Postman (or whatever API developing platform) you can:

- Send instructions to a worker. These instructions are defined as a `JSON` object with the next fields. Each processed output will be stored in the Kafka queue and then consumed by the frontend to store in a MYSQL DB.

  | REST Operation | Endpoint           |
  | -------------- | ------------------ |
  | POST           | localhost:3000/job |

  ### JSON Body

  | Variable   | Definition                                                                          |
  | ---------- | ----------------------------------------------------------------------------------- |
  | "url"      | The full URL of the repository that contains the code to be executed by the worker. |
  | "execPath" | The full path of the executable within the downloaded code.                         |
  | "execName" | The name of the executable program that is going to be run.                         |
  | "args"     | The arguments of the program.                                                       |
  | "outPath"  | The full path where the program is going to print the output on a file.             |
  | "outName"  | The name of the file within the "outPath" that will contain the output.             |

  ### Expected Output

  | REST | Code   | Message                        |
  | ---- | ------ | ------------------------------ |
  | POST | 200 OK | Petition sent with ID {job_ID} |

  ### Example of usage

  ```
  POST localhost:3000/job
  {
      "url": "https://github.com/SimonBC3/PrimeNumberCalculator.git",
      "execPath": "/",
      "execName": "main.js",
      "args": "50",
      "outPath": "/",
      "outName": "numbers.txt"
  }
  ```

  This example will download the code located in `https://github.com/SimonBC3/PrimeNumberCalculator.git`, navigate to the root folder of the downloaded repo and execute `"main.js 50"`, writing its output in the same folder in a file named `"numbers.txt"`.

- Get the results.

  | REST | Endpoint                |
  | ---- | ----------------------- |
  | GET  | localhost:3000/{job_ID} |

  ### Expected Results

  | REST | Code   | Message                  |
  | ---- | ------ | ------------------------ |
  | GET  | 200 OK | Your result is: {result} |

  ### Example of usage

  ```
  GET localhost:3000/yw33bkyaig9

  Your result is: 0,1,2,3,5,7,11,13,17,19,23,29,31,37,41,43,47
  ```

## Limitations ⚠️

1. Workers can only run JavaScript programs.
2. The programs MUST output their result in a format that can be stored in a file (such as a string) with less than 1024 UTF-8 characters.
3. The number of workers attending petitions is fixed.
4. The KeyCloack implementation is not working.
5. Deployment in a PaaS (such as Kumori) is not specified. Everything runs in docker containers.
