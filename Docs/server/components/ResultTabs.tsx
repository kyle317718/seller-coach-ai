'use client';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface ResultTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ResultTabs({ tabs, activeTab, onTabChange }: ResultTabsProps) {
  return (
    <div className="flex border-b border-gray-200 mb-8 font-['Pretendard']">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 text-base font-bold transition-colors ${
            activeTab === tab.id
              ? 'text-[#5CA8FF] border-b-2 border-[#5CA8FF]'
              : 'text-[#333333] hover:text-gray-700'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
} 