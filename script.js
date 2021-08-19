import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 12000,
  duration: '15s',
};

export default function () {
  const res1 = http.get(`http://localhost:4747/products/${Math.ceil(Math.random() * 1000000)}`);
  const res2 = http.get(`http://localhost:4747/products/${Math.ceil(Math.random() * 1000000)}/styles`);
  const res3 = http.get('http://localhost:4747/products/?count=5&page=1');
  sleep(1);

  check(res1, {
    'is status 200': (r) => r.status === 200,
    'is duration < 50': (r) => r.timings.duration < 50,
  });
  check(res2, {
    'is status 200': (r) => r.status === 200,
    'is duration < 50': (r) => r.timings.duration < 50,
  });
  check(res3, {
    'is status 200': (r) => r.status === 200,
    'is duration < 50': (r) => r.timings.duration < 50,
  });
}

// ${Math.ceil(Math.random() * 1000000)}
