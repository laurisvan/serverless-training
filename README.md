# Serverless 1.x training

This one-day tutorial walks you through with the Serverless Framework. It is intended
for people already familiar with JavaScript and preliminary Node.js knowledge.

After this tutorial, you should:

* Be able to create a Serverless service on your own
* Know what happens under the hood in AWS and in Serverless framework
* Have a simple, but testable and production ready service

## Prerequisites

* Node.js installed (the tutorial uses v7.5.0)
* Personal AWS account
* A HTTP client (the tutorial uses Postman)
* Serverless 1.X installed (the tutorial uses 1.7.0)

## Contents

### Session 1: Hello World in Serverless

Goal: Get to know Serverless CLI and how it plays with AWS. We create a simple
Serverless service.

Demo:

* Configure the environment
* Create run, deploy & delete a Serverless function
* Create a HTTP(S) endpoint
* Peek into Serverless YAML configuration
* Peek under the hood: What happened in AWS: Lambda, API Gateway, Cloudwatch

Exercise: Set up your own project

* Configure your credentials
* Create a Hello, World that accepts input
* Invoke it remotely & over HTTPS - experiment with the data that API Gateway provides
* Deploy & monitor the logs when you call it
* Optional: Write error handler(s) supporting a few types of input
  * Path
  * JSON body
  * Query string

More information:

* Git tags: 0.0.0-initial, 0.0.1-hello
* [Cheatsheet](Cheatsheet.md)
* [API Gateway proxy format](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html)
