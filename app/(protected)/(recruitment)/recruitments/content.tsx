import { Faq } from '@/app/components/partials/common/faq';
import { Help2 } from '@/app/components/partials/common/help2';

export default function RecruitmentsContent() {
  return (
    //give gap each component
    <div className="grid gap-5 lg:gap-7.5">
      <Faq />
      <Help2 />
    </div>
  );
}
