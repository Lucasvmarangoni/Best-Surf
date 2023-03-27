import { AxiosStatic } from 'axios';

export class StormGlass {
  constructor(protected request: AxiosStatic) {}

  public async fetchPoints(lat: number, lng: number): Promise<{}> {
    return this.request.get(
      `https://api.stormglass.io/v2/weather/point?
      params=swellDirection%2CswellHeight%2CswellPeriod%2CwaveDirection%2
      CwaveHeight%2CwindDirection%2CwindSpeed&source=noaa&
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
