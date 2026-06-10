import { Faq } from '@/app/components/partials/common/faq';
import { Help2 } from '@/app/components/partials/common/help2';
import { InvitePeople } from '../../account/invite-a-friend/components';
import { EmployeesList } from './components';

export default function EmployeesContent() {
  return (
    //give gap each component
    <div className="grid gap-5 lg:gap-7.5">
      <EmployeesList />
      <Faq />
      <Help2 />
      <InvitePeople />
    </div>
  );
}
