'use client';

import { Fragment } from 'react';
import { Container } from '@/components/common/container';
import { AccountPlansContent } from '@/app/(protected)/account/billing/plans/content';
import { PageNavbar } from '@/app/(protected)/account/page-navbar';

export default function AccountPlansPage() {
  return (
    <Fragment>
      <PageNavbar />
      <Container>
        <AccountPlansContent />
      </Container>
    </Fragment>
  );
}
