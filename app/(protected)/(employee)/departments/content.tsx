import { DepartmentsList } from './components';

export default function DepartmentsContent() {
  return (
    //give gap each component
    <div className="grid gap-5 lg:gap-7.5">
      <DepartmentsList />
    </div>
  );
}
