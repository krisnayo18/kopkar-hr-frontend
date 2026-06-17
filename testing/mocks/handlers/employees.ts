import { http, HttpResponse } from 'msw';
import { env } from '@/config/env';
import { db } from '../db';
import { networkDelay } from '../utils';

export const employeesHandlers = [
  // GET /employees
  http.get(`${env.NEXT_PUBLIC_HR_API_URL}/employees`, async () => {
    await networkDelay();
    return HttpResponse.json(db.employees);
  }),

  // GET /employees/:id
  http.get(
    `${env.NEXT_PUBLIC_HR_API_URL}/employees/:id`,
    async ({ params }) => {
      await networkDelay();
      const emp = db.employees.find((e) => e.id === params.id);
      if (!emp)
        return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      return HttpResponse.json(emp);
    },
  ),

  // POST /employees
  http.post(`${env.NEXT_PUBLIC_HR_API_URL}/employees`, async ({ request }) => {
    await networkDelay();
    const body = (await request.json()) as Record<string, unknown>;
    const newEmp = {
      id: `emp-${Date.now()}`,
      employeeNumber: (body.employeeNumber as string) ?? '',
      nik: (body.nik as string) ?? '',
      nickName: (body.nickName as string) ?? '',
      fullName: (body.fullName as string) ?? '',
      email: (body.email as string) ?? '',
      gender: (body.gender as any) ?? 'Male',
      birthDate: (body.birthDate as string) ?? new Date().toISOString(),
      birthPlace: (body.birthPlace as string) ?? '',
      age: (body.age as number) ?? 0,
      maritalStatus: (body.maritalStatus as any) ?? 'Single',
      nationality: (body.nationality as string) ?? '',
      departmentId: (body.departmentId as string) ?? '',
      positionId: (body.positionId as string) ?? '',
      status: (body.status as any) ?? 'Active',
      employmentType: (body.employmentType as any) ?? 'Permanent',
      joinDate: (body.joinDate as string) ?? new Date().toISOString(),
      company: (body.company as any) ?? 'Koperasi',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...body,
    } as any;
    db.employees.push(newEmp);
    return HttpResponse.json(newEmp, { status: 201 });
  }),

  // PATCH /employees/:id
  http.patch(
    `${env.NEXT_PUBLIC_HR_API_URL}/employees/:id`,
    async ({ params, request }) => {
      await networkDelay();
      const idx = db.employees.findIndex((e) => e.id === params.id);
      if (idx === -1)
        return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      const body = (await request.json()) as Record<string, unknown>;
      db.employees[idx] = {
        ...db.employees[idx],
        ...body,
        updatedAt: new Date().toISOString(),
      } as any;
      return HttpResponse.json(db.employees[idx]);
    },
  ),

  // DELETE /employees/:id
  http.delete(
    `${env.NEXT_PUBLIC_HR_API_URL}/employees/:id`,
    async ({ params }) => {
      await networkDelay();
      const idx = db.employees.findIndex((e) => e.id === params.id);
      if (idx === -1)
        return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      db.employees.splice(idx, 1);
      return new HttpResponse(null, { status: 204 });
    },
  ),
];
