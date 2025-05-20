import TaxCalendar from './TaxCalendar';
import DocumentChecklist from './DocumentChecklist';
import AccountantConnector from './AccountantConnector';

export default function TaxGuideStep() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">📊 세금 걱정은 이제 그만!</h2>
      <div className="space-y-4">
        <TaxCalendar />
        <DocumentChecklist />
        <AccountantConnector />
      </div>
    </div>
  );
}
