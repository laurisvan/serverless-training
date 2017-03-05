# Serverless 1.x Cheat Sheet

## Install & Configure

Environment
> export SLS_IGNORE_WARNING=*      # Get rid of Serverless CLI deprecation warnings
> export AWS_PROFILE=<profile>     # Use a given AWS profile (e.g. serverless-admin)
> export AWS_REGION=<region>       # Deploy to a given AWS region (e.g. eu-west-1)

Install Serverless & Related Tools
> npm install -g serverless        # Install Serverless
> npm install -g serverless@1.7    # ... v1.7.x
> brew install
> pip install awscli               # Install AWS CLI using Python PIP
> brew install awscli              # Install AWS CLI using Homebrew
> brew install jq                  # Install jq command-line JSON parser

Create "serverless-admin" AWS IAM user, attach administrator policy and generate access credentials
> aws iam create-user --user-name <user>
> aws iam attach-user-policy --policy-arn arn:aws:iam::aws:policy/AdministratorAccess --user-name <user>
> aws iam create-access-key --user-name <user> > credentials.json

Configure the credentials using Serverless
> sls config credentials -p <provider> -n <profile> -k <key> --s <secret>
> sls config credentials -p aws -n serverless-admin -k $(jq -r .AccessKey.AccessKeyId credentials.json) -s $(jq -r .AccessKey.SecretAccessKey credentials.json)

## Boostrap a New Project

Create a new Serverless project (while in the project directory)
> sls create -p <service-name> -t <template>
> sls create -p hello-service -t aws-nodejs

Use an existing service as the basis (note: the URL not the GitHub clone URL)
> sls install -n auth-example -u https://github.com/eahefnawy/serverless-authorizer

## Project life-cycle commands

Run the service
> sls invoke local -f <function-name>   # Invokes function locally
> sls invoke -f <function-name>         # Invokes a deployed function with no input
> sls invoke -f <function-name> -d < <input> # Invokes the fucntion with input from STDIN
> sls invoke -f <function-name> -p <path>    # Invokes the fucntion with input from JSON
> sls logs -f <function-name> [--start-time <timestamp|pattern>] [--filter <pattern>] [--tail]

Deploy the service
> sls deploy [-s <stage>] [-r <region>] [-n <service-name>] [-v ] # The general syntax for deployment
> sls deploy                                       # Deploys the service in $PWD with default stage & region
> sls deploy -v                                    # Verbose view of the deployment process
> sls deploy function -f <function-name> [-s] [-r] # Deploys a single function (not using CF)
> sls deploy list                                  # List deployments

Remove the service
> sls remove [-stage <stage>] [-r <region>] [-n <service-name>] # Removes a service
