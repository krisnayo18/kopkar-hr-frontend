import { http, HttpResponse } from 'msw';
import { env } from '@/config/env';
import { db } from '../db';
import { networkDelay } from '../utils';

export const positionsHandlers = [
  // GET /positions
  http.get(`${env.NEXT_PUBLIC_HR_API_URL}/positions`, async () => {
    await networkDelay();
    return HttpResponse.json(db.positions);
  }),

  // GET /positions/:id
  http.get(
    `${env.NEXT_PUBLIC_HR_API_URL}/positions/:id`,
    async ({ params }) => {
      await networkDelay();
      const pos = db.positions.find((p) => p.id === params.id);
      if (!pos)
        return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      return HttpResponse.json(pos);
    },
  ),

  // POST /positions
  http.post(`${env.NEXT_PUBLIC_HR_API_URL}/positions`, async ({ request }) => {
    await networkDelay();
    const body = (await request.json()) as Record<string, unknown>;
    const newPos = {
      id: `pos-${Date.now()}`,
      code: body.code as string,
      name: body.name as string,
      description: (body.description as string) ?? null,
      departmentId: body.departmentId as string,
      minSalary: (body.minSalary as number) ?? null,
      maxSalary: (body.maxSalary as number) ?? null,
      status: (body.status as 'Active' | 'Inactive') ?? 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      headCount: 0,
    };
    db.positions.push(newPos);
    return HttpResponse.json(newPos, { status: 201 });
  }),

  // PATCH /positions/:id
  http.patch(
    `${env.NEXT_PUBLIC_HR_API_URL}/positions/:id`,
    async ({ params, request }) => {
      await networkDelay();
      const idx = db.positions.findIndex((p) => p.id === params.id);
      if (idx === -1)
        return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      const body = (await request.json()) as Record<string, unknown>;
      db.positions[idx] = {
        ...db.positions[idx],
        ...(body as object),
        updatedAt: new Date().toISOString(),
      };
      return HttpResponse.json(db.positions[idx]);
    },
  ),

  // DELETE /positions/:id
  http.delete(
    `${env.NEXT_PUBLIC_HR_API_URL}/positions/:id`,
    async ({ params }) => {
      await networkDelay();
      const idx = db.positions.findIndex((p) => p.id === params.id);
      if (idx === -1)
        return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      db.positions.splice(idx, 1);
      return new HttpResponse(null, { status: 204 });
    },
  ),
];
