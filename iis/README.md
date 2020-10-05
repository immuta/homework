# Immuta Candidate Homework - Internal Infrastructure Services

## Scenario

Your team is in the middle of building a data pipeline that extracts data from an HTTP stream API to
specific indexes in Elasticsearch. All components must run in docker containers and be deployed
from the provided `docker-compose.yml` file.

## Components

### Data API

- When called, this API pulls data from the relevant data streams and returns results in JSON format.
    Each stream endpoint can return anywhere from 0-5 results at a time.
- The API currently offers data from two streams: Sentences (`/sentences`) and Paragraphs (`/paragraphs`)
- The application and corresponding Dockerfile have already been implemented, however, the docker build
    still must be run in order to create the image.

### Elasticsearch

- Elasticsearch 7.4.0 must be deployed and reachable by the processor components.

### Kibana

- Kibana 7.4.0 must be deployed and reachable by your local browser.

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
- Complete the processor docker build. There is a skeleton Dockerfile in the `processor` directory.
- Deploy the Sentence Processor container. There is an existing entry in the docker-compose file
    for this container, however it may require some modification to work properly.
- Deploy the Paragraph Processor container. There is currently no entry for this container in the
    docker-compose file, so you must add one from scratch.
- Deploy all containers using `docker-compose`.
- Open Kibana in your local browser, and take screenshots of you querying the `sentences` and
    `paragraphs` Elastic indexes.



