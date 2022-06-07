# Immuta Candidate Homework - Application Support Engineering

## Overview

This assignment will test your ability to write code and deploy multiple software components
in an orchestrated fashion. Before you begin, you will need to install the following
dependencies on your machine:

- Docker: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/

Below is a detailed desciption of the assignment. The precise assignment requirements
can be found in the [Your Tasks](#your-tasks) section.

Once the assignment is complete, you can create a tar/zip archive and email it back to us,
or create a private github repository and invite the hiring manager. Please do not create
a public github fork of this repository.

## Scenario

Your team is in the middle of building a data pipeline that extracts data from an HTTP stream API to
specific indexes in Elasticsearch. All components must run in docker containers and be deployed
from the provided `docker-compose.yml` file.

The implementation was semi-completed by another engineer before they left the team, with sparse documentation
to help you complete it. Your task is to put the rest of the pieces together to create a working product, and add
any additional fixes that you see fit.

## Components

### Data API

- When called, this API pulls data from the relevant data streams and returns results in JSON format.
    Each stream endpoint can return anywhere from 0-5 results at a time.
- The API currently offers data from two streams: Sentences (`/sentences`) and Paragraphs (`/paragraphs`)
- The application and corresponding Dockerfile have already been implemented, however, the docker build
    still must be run in order to create the image.

### Elasticsearch

- Elasticsearch 7.17.0 must be deployed and reachable by the processor components.

### Kibana

- Kibana 7.16.0 must be deployed and reachable by your local browser.

### Processors

The data processors in this pipeline are responsible for moving data from the Data API into
Elasticsearch. In addition to what is listed below, these components have the following
additional requirements:

- Each processor must adhere to a limit of 20 API calls every 2 minutes to avoid overloading
    the Data API.
- Each processor must run in its own individual docker container.
- All processors must share the same docker image (`processor:latest`).

#### Sentence Processor

The Sentence Processor pulls in data from the `/sentences` endpoint of the Data API, and stores
all results in the `sentences` index in Elasticsearch. The engineer who previously worked on this project
began implementing this processor - skeleton code and a Dockerfile can be found in the `processor` directory,
along with a corresponding `sentence_processor` service declaration in the `docker-compose.yml` file.

#### Paragraph Processor

The Paragraph Processor pulls in data from the `/paragraphs` endpoint of the Data API, and stores
all results in the `paragraphs` index in Elasticsearch. Work on this component has not been started.
This component should use the same code / build in the `processors` directory that the
Sentence Processor uses, but it should have its own unique service declaration in the
docker-compose file.

## Your Tasks

In order to complete this assignment, you must:

- Implement the processor code. There is a python skeleton in the `processor` directory, but
    feel free to implement this in any language of your choosing.
- Run the processor docker build. There is a skeleton Dockerfile in the `processor` directory.
- Deploy the Sentence Processor container. There is an existing entry in the docker-compose file
    for this container, however it may require some modification to work properly.
- Deploy the Paragraph Processor container. There is currently no entry for this container in the
    docker-compose file, so you must add one from scratch.
- Deploy all containers using `docker-compose`.
- Open Kibana in your local browser, and take screenshots of you querying the `sentences` and
    `paragraphs` Elastic indexes.
- [Optional] Add any improvements that you see fit to the docker builds or docker-compose file.

