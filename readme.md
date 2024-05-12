# Auctional

## Intro

This project contains the code for the Auctional app. The frontend uses Typescript, React and Next.js. The backend is written in C# with .Net Core 8.

This app uses a clean architecture and microservices approach. RabbitMQ and gRPC provide the communication between the projects. Data is stored in Postgres and MongoDB.

Every project and service is containerized and can be run either with Docker or on a Kubernetes cluster.

## Sample kubernetes secrets yaml

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: postgres-secret
type: Opaque
stringData:
  password: YOURPOSTGRESPASSWORD
---
apiVersion: v1
kind: Secret
metadata:
  name: rabbit-secret
type: Opaque
stringData:
  username: YOURRABBITMQUSERNAME
  password: YOURRABBITMQPASSWORD
---
apiVersion: v1
kind: Secret
metadata:
  name: mongo-secret
type: Opaque
stringData:
  username: YOURMONGODBUSERNAME
  password: YOURMONGODBPASSWORD
  connString: mongodb://YOURMONGODBUSERNAME:YOURMONGODBPASSWORD@mongo-clusterip
---
apiVersion: v1
kind: Secret
metadata:
  name: auction-secret
type: Opaque
stringData:
  connString: 'Server=postgres-clusterip:5432;User Id=postgres;Password=YOURPOSTGRESPASSWORD;Database=auctions'
---
apiVersion: v1
kind: Secret
metadata:
  name: webapp-secret
type: Opaque
stringData:
  authSecret: YOURAUTHSECRET
  clientSecret: YOURCLIENTSECRET
```
