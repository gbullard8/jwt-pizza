import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'

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
}

export function scenario_1() {
  let response

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
        'if-modified-since': 'Tue, 26 Nov 2024 12:50:39 GMT',
        'if-none-match': '"938f714d124d21f55444b6dcb8d4aa9b"',
        priority: 'u=0, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(8.6)

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
          origin: 'https://pizza.cs329jwtpizza.com',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
      if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
        console.log(response.body);
        fail('Login was *not* 200');
      }
      

    response = http.options('https://pizza-service.cs329jwtpizza.com/api/auth', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'PUT',
        origin: 'https://pizza.cs329jwtpizza.com',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })
    sleep(6.1)
    const authToken = JSON.parse(response.body.toString()).token;

    // Get Menu
    response = http.get('https://pizza-service.cs329jwtpizza.com/api/order/menu', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        dnt: '1',
        origin: 'https://pizza.cs329jwtpizza.com',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        authorization: `Bearer ${authToken}`
      },
    })

    response = http.options('https://pizza-service.cs329jwtpizza.com/api/order/menu', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'GET',
        origin: 'https://pizza.cs329jwtpizza.com',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })

    // Get Franchise
    response = http.get('https://pizza-service.cs329jwtpizza.com/api/franchise', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        dnt: '1',
        origin: 'https://pizza.cs329jwtpizza.com',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })

    response = http.options('https://pizza-service.cs329jwtpizza.com/api/franchise', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'GET',
        origin: 'https://pizza.cs329jwtpizza.com',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })
    sleep(8.7)

    response = http.post(
      'https://pizza-service.cs329jwtpizza.com/api/order',
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          dnt: '1',
          origin: 'https://pizza.cs329jwtpizza.com',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          authorization: `Bearer ${authToken}`,
        },
      }
    )

    response = http.options('https://pizza-service.cs329jwtpizza.com/api/order', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'POST',
        origin: 'https://pizza.cs329jwtpizza.com',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })
    sleep(3.6)

    if (!check(response, { 'status equals 200': (res) => res.status === 200 })) {
      console.log(response.body);
      fail('Order request failed');
    }

    const orderJwt = JSON.parse(response.body.toString()).jwt;

    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      JSON.stringify({ jwt: orderJwt }),
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          dnt: '1',
          origin: 'https://pizza.cs329jwtpizza.com',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
        },
      }
    )

    response = http.options('https://pizza-factory.cs329.click/api/order/verify', null, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'access-control-request-headers': 'authorization,content-type',
        'access-control-request-method': 'POST',
        origin: 'https://pizza.cs329jwtpizza.com',
        priority: 'u=1, i',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
      },
    })
    if (!check(response, { 'status equals 200': (res) => res.status === 200 })) {
      console.log(response.body);
      fail('Order verification failed');
    }
  })
}
