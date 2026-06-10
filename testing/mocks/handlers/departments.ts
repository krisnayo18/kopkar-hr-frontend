import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { env } from '@/config/env';
import { networkDelay } from '../utils';

export const departmentsHandlers = [
  // GET /departments
  http.get(`${env.NEXT_PUBLIC_HR_API_URL}/departments`, async () => {
    await networkDelay();
    return HttpResponse.json(db.departments);
  }),

  // GET /departments/:id
  http.get(`${env.NEXT_PUBLIC_HR_API_URL}/departments/:id`, async ({ params }) => {
    await networkDelay();
    const dept = db.departments.find((d) => d.id === params.id);
    if (!dept)
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json(dept);
  }),

  // POST /departments
  http.post(`${env.NEXT_PUBLIC_HR_API_URL}/departments`, async ({ request }) => {
    await networkDelay();
    const body = (await request.json()) as Record<string, unknown>;
    const newDept = {
      id: `dept-${Date.now()}`,
      code: body.code as string,
      name: body.name as string,
      description: (body.description as string) ?? null,
      parentId: (body.parentId as string) ?? null,
      managerId: (body.managerId as string) ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      headCount: 0,
    };
    db.departments.push(newDept);
    return HttpResponse.json(newDept, { status: 201 });
  }),

  // PATCH /departments/:id
  http.patch(
    `${env.NEXT_PUBLIC_HR_API_URL}/departments/:id`,
    async ({ params, request }) => {
      await networkDelay();
      const idx = db.departments.findIndex((d) => d.id === params.id);
      if (idx === -1)
        return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      const body = (await request.json()) as Record<string, unknown>;
      db.departments[idx] = {
        ...db.departments[idx],
        ...(body as object),
        updatedAt: new Date().toISOString(),
      };
      return HttpResponse.json(db.departments[idx]);
    },
  ),

  // DELETE /departments/:id
  http.delete(`${env.NEXT_PUBLIC_HR_API_URL}/departments/:id`, async ({ params }) => {
    await networkDelay();
    const idx = db.departments.findIndex((d) => d.id === params.id);
    if (idx === -1)
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    db.departments.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
