FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 as builder
ARG TARGETARCH
WORKDIR /app
EXPOSE 80

COPY auctional.sln auctional.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/NotificationService/NotificationService.csproj src/NotificationService/NotificationService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj

COPY tests/AuctionService.UnitTests/AuctionService.UnitTests.csproj tests/AuctionService.UnitTests/AuctionService.UnitTests.csproj
COPY tests/AuctionService.IntegrationTests/AuctionService.IntegrationTests.csproj tests/AuctionService.IntegrationTests/AuctionService.IntegrationTests.csproj

RUN dotnet restore -a $TARGETARCH auctional.sln

COPY src/NotificationService src/NotificationService
COPY src/Contracts src/Contracts

WORKDIR /app/src/NotificationService
RUN dotnet publish -a $TARGETARCH -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=builder /app/src/out/ .
ENTRYPOINT [ "dotnet", "NotificationService.dll" ]