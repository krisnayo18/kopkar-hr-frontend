import { http, HttpResponse } from 'msw';
import { env } from '@/config/env';
import { db } from '../db';
import { networkDelay } from '../utils';

export const contractsHandlers = [
  // GET /contracts
  http.get(`${env.NEXT_PUBLIC_HR_API_URL}/contracts`, async ({ request }) => {
    await networkDelay();
    
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const status = url.searchParams.get('status');

    let results = db.contracts;

    if (search) {
      const lowerSearch = search.toLowerCase();
      results = results.filter(c => 
        c.contractNumber.toLowerCase().includes(lowerSearch) || 
        c.contractType.toLowerCase().includes(lowerSearch)
      );
    }

    if (status) {
      results = results.filter(c => c.status === status);
    }

    return HttpResponse.json(results);
  }),
];
