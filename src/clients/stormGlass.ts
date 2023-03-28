import { AxiosStatic } from 'axios';

export class StormGlass {
  readonly stormGlassAPIParams = `swellDirection%2CswellHeight%2CswellPeriod%2CwaveDirection%2
  CwaveHeight%2CwindDirection%2CwindSpeed`;
  readonly stormGlassAPISource = 'noaa';

  constructor(protected request: AxiosStatic) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async fetchPoints(lat: number, lng: number): Promise<{}> {
    return this.request.get(
      `https://api.stormglass.io/v2/weather/point?
      params=${this.stormGlassAPIParams}&
      source=${this.stormGlassAPISource}&
      end=1592113802&
      lat=${lat}&
      lng=${lng}`
    );
  }
}

/*

Promise.resolve({});
No caso de Promise.resolve({}), a Promise é criada imediatamente e 
retorna um valor resolvido {} de forma síncrona. 
Isso pode ser útil em situações em que uma Promise precisa ser retornada, 
mas o valor já está disponível de forma síncrona.
*/
