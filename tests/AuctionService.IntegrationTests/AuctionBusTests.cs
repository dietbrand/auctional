using System.Net;
using System.Net.Http.Json;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.IntegrationTests.Fixtures;
using AuctionService.IntegrationTests.Utils;
using Contracts;
using MassTransit.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace AuctionService.IntegrationTests;
[Collection("shared collection")]
public class AuctionBusTests : IAsyncLifetime
{
  private readonly CustomWebAppFactory _factory;
  private readonly HttpClient _httpClient;
  private ITestHarness _testHarness;

  public AuctionBusTests(CustomWebAppFactory factory)
  {
    _factory = factory;
    _httpClient = factory.CreateClient();
    _testHarness = factory.Services.GetTestHarness();
  }

  [Fact]
  public async Task CreateAuction_WithValidObject_ShouldPublishAuctionCreated()
  {
    var auction = GetAuctionForCreate();
    _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("jimmy"));
    var response = await _httpClient.PostAsJsonAsync("api/auctions", auction);

    response.EnsureSuccessStatusCode();
    Assert.True(await _testHarness.Published.Any<AuctionCreated>());
  }
  public Task DisposeAsync()
  {
    using var scope = _factory.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();
    DbHelper.ReinitDbForTests(db);
    return Task.CompletedTask;
  }

  public Task InitializeAsync() => Task.CompletedTask;
  private static CreateAuctionDto GetAuctionForCreate()
  {
    return new CreateAuctionDto
    {
      Make = "test",
      Model = "testModel",
      ImageUrl = "test",
      Color = "black",
      Mileage = 1000,
      Year = 2018,
      ReservePrice = 10000,
    };
  }
}
