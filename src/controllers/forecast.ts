import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import apiForecastResponse1BeachFixture from '../fixtures/api_forecast_response_1_beach.json';

@Controller('forecast')
export class ForecastController {
  @Get('')
  public getForecastForLoggedUser(_: Request, res: Response): void {
    res.send(apiForecastResponse1BeachFixture);
  }
}
