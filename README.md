# Serverless 1.x training

This one-day tutorial walks you through with the Serverless Framework. It is intended
for people already familiar with JavaScript and preliminary Node.js knowledge.

After this tutorial, you should:

* Be able to create a Serverless service on your own
* Know what happens under the hood in AWS and in Serverless framework
* Have a simple, but testable and production ready service

Supplementary material:

* Serverless Computing presentation: [https://bit.ly/2m8vqUV](https://bit.ly/2m8vqUV)
* Cheat Sheet: [Cheatsheet](Cheatsheet.md)

## Prerequisites

* Node.js installed (the tutorial uses v7.5.0)
* Personal AWS account
* A HTTP client (the tutorial uses Postman)
* Serverless 1.X installed (the tutorial uses 1.7.0)

## Sessions

### Session 1: Hello World in Serverless

Goal: Get to know Serverless CLI and how it plays with AWS. We create a simple Serverless service.

Demo:

* Configure the environment
* Create run, deploy & delete a Serverless function
* Create a HTTP(S) endpoint
* Peek into Serverless YAML configuration
* Peek under the hood: What happened in AWS: Lambda, API Gateway, Cloudwatch

Exercise: Set up your own project, run, deploy!

* Configure your credentials
* Create a Hello, World that accepts input
* Invoke it remotely & over HTTPS - experiment with the data that API Gateway provides
* Deploy & monitor the logs when you call it
* Optional: Write error handler(s) supporting a few types of input
  * Path
  * JSON body
  * Query string

More information:

* Git branch [01-hello-world](https://github.com/laurisvan/serverless-training/tree/01-hello-world)
* [API Gateway proxy format](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html)


### Session 2: Project layout for a real Serverless project

Goal: Learn to structure Serverless service so that it can scale for a few dozen services/endpoints.

Demo:

* Creating a sample project layout
* Calling remote services with request-promise-lite

Exercise: Modify your project layout, call remote services.

* Slackbot hook that does something
* Simple REST wrapper of your target API (Google Wiki with hard-coded credentials)
- (Optional: Create dev/test/alpha/prod stages)

More information:

* Git branch [02-large-project-layout](https://github.com/laurisvan/serverless-training/tree/02-large-project-layout)
* [Slack Slash commands](https://api.slack.com/slash-commands)

### Session 3: Using plugins

Goal: Understand Serveless plugin system and how everything in Serverless is actually a plugin. Peek into a few plugins that you will use in real life.

Demo:

* Storing secrets with serveress-secrets
* Minifying builds & supporting ES2015+ using Babel & Webpack with serverless-webpack
* Testing Serverless functions with serverless-jest

Exercise:

* Safe storage of your secrets
* Basic automated system tests of your app
* (Optimized bundle)

Notes:

* `sls webpack serve` does not work with Proxy Lambdas :(
* Lambda wrapper in serverless-jest-plugin only wraps Lambda body (no headers, paths etc.)
* Many npm modules will not tolerate web pack (will be solved in later exercise)

More information:

* Git branch [03-using-plugins](https://github.com/laurisvan/serverless-training/tree/03-using-plugins)
* [serverless-secrets-plugin](https://github.com/serverless/serverless-secrets-plugin)
* [serverless-webpack-plugin](https://github.com/elastic-coders/serverless-webpack)
* [serverless-jest-plugin](https://github.com/SC5/serverless-jest-plugin/)
* [AWS KMS](https://aws.amazon.com/kms/)
* [JEST testing Framework](https://facebook.github.io/jest/)

### Session 4: CloudFormation Resources, Database Connectivity

Demo: 

* Creating a AWS RDS (Postgres) instance using CloudFormation
* Simple database migration script using Knex
* Reorganising your project so that it works with node modules that do not support webpack

Exercise:

* Create simple DAO connectivity for your service

Notes:

* This is the hardest session, because it opens all the gory details of Webpack incompatibilities, large module dependency graphs and CloudFormation failures
* Do not do CloudFormation in your individual exercises - you are provided with credentials.

More information:

* Git branch [04-serverless-cloudformation-db](https://github.com/laurisvan/serverless-training/tree/04-serverless-cloudformation-db)
* [Knex](http://knexjs.org/) and [Objection](http://vincit.github.io/objection.js/) DB wrappers
* [CloudFormation templates](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/sample-templates-services-us-west-2.html)

### Session 5: Serverless & Web Frontends

Goal: Understand that with some dirty tricks, you can create very-low cost web services using S3 and AWS Lambda.

Exercise:

* Finish your Slackbot
* (Write a simple web frontend as an alternative command channel, if the time permits)

Notes:

* There is no Git branch prepared - this is a walkthrough of AWS Squirrelbin sample

More information:

* [AWS Squirrelbin sample](https://aws.amazon.com/blogs/compute/the-squirrelbin-architecture-a-serverless-microservice-using-aws-lambda/)