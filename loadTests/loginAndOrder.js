import { sleep, check, group, fail } from 'k6';
import http from 'k6/http';

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
};

export function scenario_1() {
  let response;

  group('page_1 - https://pizza.cs329jwtpizza.com/', function () {
    // Homepage
    response = http.get('https://pizza.cs329jwtpizza.com/', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        dnt: '1',
      },
    });
    sleep(8.6);

    // Login
    response = http.put(
      'https://pizza-service.cs329jwtpizza.com/api/auth',
      '{"email":"a@a.com","password":"a"}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          dnt: '1',
        },
      }
    );

    if (!check(response, { 'status equals 200': (res) => res.status === 200 })) {
      console.log(response.body);
      fail('Login was *not* 200');
    }

    const authToken = JSON.parse(response.body.toString()).token; 

    // Get Menu
    response = http.get('https://pizza-service.cs329jwtpizza.com/api/order/menu', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'content-type': 'application/json',
        dnt: '1',
        authorization: `Bearer ${authToken}`, 
      },
    });

    // Place Order
    response = http.post(
      'https://pizza-service.cs329jwtpizza.com/api/order',
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'content-type': 'application/json',
          dnt: '1',
          authorization: `Bearer ${authToken}`, 
        },
      }
    );

    if (!check(response, { 'status equals 200': (res) => res.status === 200 })) {
      console.log(response.body);
      fail('Order request failed');
    }

    const orderJwt = JSON.parse(response.body.toString()).jwt; 

    // Verify Order
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      JSON.stringify({ jwt: orderJwt }), 
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'content-type': 'application/json',
          dnt: '1',
        },
      }
    );

    if (!check(response, { 'status equals 200': (res) => res.status === 200 })) {
      console.log(response.body);
      fail('Order verification failed');
    }
  });
}
