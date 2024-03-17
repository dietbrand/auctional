FROM mcr.microsoft.com/dotnet/sdk:8.0 as builder
WORKDIR /app
EXPOSE 80

COPY auctional.sln auctional.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj

RUN dotnet restore auctional.sln

COPY src/SearchService src/SearchService
COPY src/Contracts src/Contracts

WORKDIR /app/src/SearchService
RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=builder /app/src/out/ .
ENTRYPOINT [ "dotnet", "SearchService.dll" ]