// Vercel Function: commercial-use-permitted MET Norway weather forecast for Berlin.
// MET Norway requires identification, attribution and responsible caching.
// Documentation: https://api.met.no/doc/TermsOfService
const FORECAST_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=52.5200&lon=13.4050';

function describeSymbol(symbol) {
  const code = String(symbol || '').replace(/_(day|night|polartwilight)$/, '');
  if (code.includes('partlycloudy')) return 'Partly cloudy';
  if (code.includes('clearsky')) return 'Clear sky';
  if (code.includes('cloudy')) return 'Cloudy';
  if (code.includes('fair')) return 'Mostly clear';
  if (code.includes('fog')) return 'Foggy';
  if (code.includes('snow')) return 'Snow';
  if (code.includes('sleet')) return 'Sleet';
  if (code.includes('rain') || code.includes('drizzle')) return 'Rain';
  if (code.includes('thunder')) return 'Thunderstorms';
  return 'Weather';
}

export default {
  async fetch(request) {
    if (request.method !== 'GET') {
      return new Response('Method not allowed', {status:405, headers:{Allow:'GET'}});
    }
    try {
      const response = await fetch(FORECAST_URL, {
        headers: {
          'User-Agent': 'StanislavRyabchikPortfolio/1.0 (hi.stanislavryabchik@gmail.com)',
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(8000)
      });
      if (!response.ok) throw new Error('Forecast service returned ' + response.status);
      const data = await response.json();
      const next = data?.properties?.timeseries?.[0]?.data;
      const temperature = next?.instant?.details?.air_temperature;
      const symbol = next?.next_1_hours?.summary?.symbol_code ||
        next?.next_6_hours?.summary?.symbol_code ||
        next?.next_12_hours?.summary?.symbol_code;
      if (typeof temperature !== 'number' || !Number.isFinite(temperature)) {
        throw new Error('No valid temperature');
      }
      return Response.json({
        temperature: Math.round(temperature),
        condition: describeSymbol(symbol),
        provider: 'MET Norway'
      }, {
        status:200,
        headers:{
          'Cache-Control':'public, max-age=0, s-maxage=10800, stale-while-revalidate=3600'
        }
      });
    } catch (_) {
      return Response.json({error:'Weather unavailable'}, {
        status:503,
        headers:{'Cache-Control':'no-store'}
      });
    }
  }
};
