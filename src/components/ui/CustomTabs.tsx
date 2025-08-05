import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../style/customtabs.css';

interface TabOption {
  key: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface CustomTabsProps {
  tabOptions: TabOption[];
  className?: string;
  activeKey: string;
  setActiveKey: (key: string) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabOptions,
  className = "",
  activeKey,
  setActiveKey
}) => {
  return (
    <Tabs
      activeKey={activeKey}
      onSelect={(k) => k && setActiveKey(k)}
      id="custom-tab"
      className={`custom-tabs ${className}`}
      fill
    >
      {tabOptions.map((tab) => (
        <Tab
          eventKey={tab.key}
          title={tab.label}
          key={tab.key}
          disabled={tab.disabled}
        >
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
