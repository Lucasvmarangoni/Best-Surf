import apiForecastResponse1BeachFixture from "../fixtures/api_forecast_response_1_beach.json";

describe("Beach forecast functional test", () => {
  it("should return a forecast with just a few times", async () => {
    const { body, status } = await global.testRequest.get("/forecast");
    expect(status).toBe(200);
    expect(body).toEqual(apiForecastResponse1BeachFixture);
  });
});
