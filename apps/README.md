# Immuta Applications Homework

- [Background](#background)
- [Your Assignment](#your-assignment)
  * [Prerequisites](#prerequisites)
  * [Tasks](#tasks)
  * [Instructions](#instructions)



## Background

Welcome to Immuta's Applications team homework task!

Here's the story: a teammate started working on a small web application that
displays a world map with a few random facts about countries. Unfortunately,
that teammate needed to switch gears and you have been tasked with finishing what
they started. It's a fairly simple application with a Node.js backend and an
Angular 10 frontend. It makes a few requests to [an external REST API](https://restcountries.eu/)
to fetch information about the countries of the world:

* Countries with the most neighboring countries
* Most populated countries

It also creates a marker on the map each time the user hovers over a country in the results pane.

Since your team deploys all of its applications in containerized environments,
it is clear to everyone that this application, small as it may be, also has to be built into a Docker
image.

Here's what the app is intended to look like:

![Screenshot of App](./screenshot.png)

## Your Assignment

### Prerequisites

- **Docker**. You will need to install [Docker](https://docs.docker.com/get-docker/) on your machine.
- **Docker Compose**. You will need to install [Docker Compose](https://docs.docker.com/compose/install/) on your machine.

Docker's official Desktop clients include both dependencies.

### Tasks

Your teammate maintains a board for this project with a list of outstanding tickets along with their
priority, as outlined below:

<table>
    <thead>
        <tr>
            <th>Ticket</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>APPS-1001</td>
            <td>Rate-limited HTTP requests</td>
            <td>
                I got word from the security team that we are
                <b>not allowed</b> to have our Node.js backend reach the internet.
                I've initially stubbed out the Node.js backend
                so that it hit the API directly.<br/>Unfortunately, we have to go through
                a proxy instead of the API.<br/><br/>The main constraint of the proxy is that it
                has a request rate limit of <b>10 requests per second</b>.
            </td>
            <td>High</td>
        </tr>
        <tr>
            <td>APPS-1002</td>
            <td>Fix Docker Build</td>
            <td>
                I've started writing a Dockerfile for the web application, but it could use
                some extra attention. For some reason, it takes forever to build the container
                even if you make the smallest change in the Node.js backend.<br/><br/>
                Apart from that, there might be additional measures to secure the container's runtime,
                but I haven't gotten around to it. I've also noticed that the final image is excessively
                big - seems wrong, but I don't know why.
            </td>
            <td>High</td>
        </tr>
        <tr>
            <td>APPS-1003</td>
            <td>Data caching</td>
            <td>
                Since we're fetching data that are quite static, and especially given the overhead of the 
                request rate limits (see ticket APPS-1001), it makes sense to cache the results, either
                upon service startup or upon the first request, to improve the user experience a little.
                I'm told we can use any data persistence method we'd like here. The important thing is
                that we optimize the performance of requests to the backend.
            </td>
            <td>High</td>
        </tr>
        <tr>
            <td>APPS-1004</td>
            <td>UI bug - loading spinners spin indefinitely</td>
            <td>
                The spinners keep being displayed indefinitely even after
                the data finished loading.
            </td>
            <td>High</td>
        </tr>
        <tr>
            <td>APPS-1005</td>
            <td>Dynamic retrieval of top N results</td>
            <td>
                Right now, we fetch the top 5 results from each metric. It would be great to allow users
                to select the number of top entries they want to display on the map. We could achieve that
                by displaying some sort of a dropdown menu or a numeric input.
            </td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>APPS-1006</td>
            <td>Simplify Docker Compose deployment</td>
            <td>
                One of the senior engineers on the DevOps team mentioned that with docker compose,
                there's a way to build the app and avoid having to manually build the image
                of each service ahead of time.
            </td>
            <td>Low</td>
        </tr>
    </tbody>
</table>

### Instructions

You're tasked with completing the tasks above. You don't have to complete all of them, and there's definitely not
a single _correct_ solution. At the very least, try to strike out high-priority tasks if you can.

1. Run the application using Docker Compose and take note of the steps you've taken to do so.
1. Take some time to familiarize yourself with the structure of the app and with the code.
1. Identify the aforementioned tasks and try to resolve them. Try to focus on the more important tasks
   first.
1. You may find bugs and missing pieces in the Node.js backend and the Angular UI.
   If you find any, please take note of them and fix them if you can.
1. Create a new markdown file (you can override this one or create another one) and summarize your solution.
   You can write down anything that you think is noteworthy. It could be one or more of the following:
   - Instructions on how to run this project
   - Challenges you've faced and how you've solved them
   - Things you think you could improve
   - Anything that comes to mind
1. Compress your solution in a `.tar.gz` file and send it back to your interviewer or as otherwise instructed.
1. Good luck!

**Technical details and guidelines:**

* Backend:
  - A Node.js app already equipped with a [hapi server](https://hapi.dev/). You can use a different web framework
    of your choice if you'd like.
  - The Node.js backend has to make requests to the proxy server, and shall not make requests outside
    the internal Docker network. Requests outside the internal docker network are invalid and will be rejected by
    the security team.
  - The only hard constraint is that you use the proxy to gather information about world countries.
* Frontend:
  - Built with Angular 10
  - It's pretty much done. Aside from task APP-1004, there isn't much you will need to change in the UI, unless you
    feel like like something needs to be changed.
  - The app is built and bundled together with the backend (same docker container).
* Proxy:
  - The proxy is off limits. You should not refactor the proxy, just make API calls to it from your
    application's backend.
  - The proxy relays requests to the [REST Countries API](https://restcountries.eu/).
    - For instance, if the proxy's internal hostname is `countries-proxy`
      and you make a call to `http://counties-proxy/rest/v2/{edge}`, the proxy would relay the request
      to `https://restcountries.eu/rest/v2/{edge}`.
    - You should be able to get information from the
      [REST Countries API Documentation](https://restcountries.eu/). That said, the proxy may
      alter some of the responses for arbitrary reasons.