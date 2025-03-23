
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricProps {
  label: string;
  value: string;
  change: number;
  target?: string;
  progress?: number;
}

const Metric: React.FC<MetricProps> = ({ label, value, change, target, progress }) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
      {progress !== undefined && (
        <Progress value={progress} className="h-1.5" />
      )}
      <div className="flex justify-between items-center text-xs">
        {target && <span className="text-muted-foreground">Target: {target}</span>}
        <span className={change >= 0 ? "text-green-500 ml-auto flex items-center" : "text-red-500 ml-auto flex items-center"}>
          {change >= 0 ? (
            <>
              <TrendingUp className="h-3 w-3 mr-1" />
              +{change}%
            </>
          ) : (
            <>
              <TrendingDown className="h-3 w-3 mr-1" />
              {change}%
            </>
          )}
        </span>
      </div>
    </div>
  );
};

const DashboardMetrics: React.FC = () => {
  return (
    <div className="space-y-4">
      <Metric 
        label="Placement Stability Rate" 
        value="87%" 
        change={3.2}
        target="85%"
        progress={87}
      />
      
      <Metric 
        label="Carer Retention Rate" 
        value="92%" 
        change={5.4}
        target="90%"
        progress={92}
      />
      
      <Metric 
        label="Children Achieving Outcomes" 
        value="76%" 
        change={-2.1}
        target="80%"
        progress={76}
      />
      
      <Metric 
        label="Budget Efficiency" 
        value="£5,280/mo" 
        change={4.3}
        target="£5,500/mo"
      />
      
      <Metric 
        label="Service Response Time" 
        value="1.2 days" 
        change={-8.5}
        target="1 day"
      />
    </div>
  );
};

export default DashboardMetrics;
