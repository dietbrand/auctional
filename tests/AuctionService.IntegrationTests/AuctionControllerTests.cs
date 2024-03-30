using System.Net;
using System.Net.Http.Json;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.IntegrationTests.Fixtures;
using AuctionService.IntegrationTests.Utils;
using Microsoft.Extensions.DependencyInjection;

namespace AuctionService.IntegrationTests;

[Collection("shared collection")]
public class AuctionControllerTests : IAsyncLifetime
{
  private readonly CustomWebAppFactory _factory;
  private readonly HttpClient _httpClient;
  private const string BUGATTI_ID = "c8c3ec17-01bf-49db-82aa-1ef80b833a9f";

  public AuctionControllerTests(CustomWebAppFactory factory)
  {
    _factory = factory;
    _httpClient = factory.CreateClient();
  }

  [Fact]
  public async Task GetAuctions_ShouldReturn3Auctions()
  {
    var response = await _httpClient.GetFromJsonAsync<List<AuctionDto>>("api/auctions");

    Assert.Equal(3, response.Count);
  }

  [Fact]
  public async Task GetAuctionById_WithValidId_ShouldReturnAuction()
  {
    var response = await _httpClient.GetFromJsonAsync<AuctionDto>($"api/auctions/{BUGATTI_ID}");

    Assert.Equal("Bugatti", response.Make);
  }

  [Fact]
  public async Task GetAuctionById_WithInvalidId_ShouldReturn404NotFound()
  {
    var response = await _httpClient.GetAsync($"api/auctions/{Guid.NewGuid()}");

    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
  }

  [Fact]
  public async Task GetAuctionById_WithInvalidGuid_ShouldReturn400BadRequest()
  {
    var response = await _httpClient.GetAsync("api/auctions/notaguid");

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task CreateAuction_WithNoAuth_ShouldReturn401Unauthorized()
  {
    var auction = new CreateAuctionDto { Make = "test" };
    var response = await _httpClient.PostAsJsonAsync("api/auctions", auction);

    Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
  }

  [Fact]
  public async Task CreateAuction_WithAuth_ShouldReturn201Created()
  {
    var auction = GetAuctionForCreate();
    _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("jimmy"));

    var response = await _httpClient.PostAsJsonAsync("api/auctions", auction);

    response.EnsureSuccessStatusCode();
    Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    var createdAuction = await response.Content.ReadFromJsonAsync<AuctionDto>();
    Assert.Equal("jimmy", createdAuction.Seller);
  }

  [Fact]
  public async Task CreateAuction_WithInvalidCreateAuctionDto_ShouldReturn400()
  {
    var auction = new CreateAuctionDto { Make = "test" };
    _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("jimmy"));

    var response = await _httpClient.PostAsJsonAsync("api/auctions", auction);

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
  }

  [Fact]
  public async Task UpdateAuction_WithValidUpdateDtoAndUser_ShouldReturn200()
  {
    var updatedAuction = new UpdateAuctionDto { Make = "Ford" };
    _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("alice"));

    var response = await _httpClient.PutAsJsonAsync($"api/auctions/{BUGATTI_ID}", updatedAuction);

    response.EnsureSuccessStatusCode();
    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    var updatedBugatti = await _httpClient.GetFromJsonAsync<AuctionDto>($"api/auctions/{BUGATTI_ID}");
    Assert.Equal("Ford", updatedBugatti.Make);
  }

  [Fact]
  public async Task UpdateAuction_WithValidUpdateDtoAndInvalidUser_ShouldReturn403()
  {
    var updatedAuction = new UpdateAuctionDto { Make = "Ford" };
    _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("jimmy"));

    var response = await _httpClient.PutAsJsonAsync($"api/auctions/{BUGATTI_ID}", updatedAuction);
    Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
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
