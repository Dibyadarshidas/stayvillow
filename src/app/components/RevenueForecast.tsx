'use client';
import { useState } from 'react';

interface ForecastProps {
  propertyData?: {
    price: number;
    occupancyRate: {
      current: number;
      previous: number;
    };
    earnings: {
      current: number;
    };
  };
}

// Seasonal multipliers for Indian tourism market
const seasonalMultipliers = {
  'jan': 1.3, // Peak season
  'feb': 1.2, // Peak season
  'mar': 1.1, // Peak season ending
  'apr': 0.9, // Shoulder season
  'may': 1.0, // Summer vacation
  'jun': 1.0, // Summer vacation
  'jul': 0.7, // Monsoon season
  'aug': 0.7, // Monsoon season
  'sep': 0.8, // Monsoon ending
  'oct': 1.1, // Festival season starting
  'nov': 1.2, // Peak season starting
  'dec': 1.4  // Peak holiday season
};

// Festival multipliers
const festivalMultipliers = {
  'Diwali': 1.5,
  'Holi': 1.3,
  'Christmas': 1.4,
  'New Year': 1.6,
  'Independence Day': 1.2,
  'Republic Day': 1.2
};

export default function RevenueForecast({ propertyData }: ForecastProps) {
  const [basePrice, setBasePrice] = useState(propertyData?.price || 8000);
  const [baseOccupancy, setBaseOccupancy] = useState(propertyData?.occupancyRate?.current || 65);
  const [months, setMonths] = useState(6);
  const [forecastData, setForecastData] = useState<Array<{
    month: string;
    revenue: number;
    occupancy: number;
    nightlyRate: number;
  }>>([]);
  const [showForecast, setShowForecast] = useState(false);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  const currentMonth = new Date().getMonth();
  
  const generateForecast = () => {
    const forecast = [];
    
    for (let i = 0; i < months; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const monthName = monthNames[monthIndex];
      const monthKey = monthName.substring(0, 3).toLowerCase();
      
      // Apply seasonal multiplier
      const seasonalMultiplier = seasonalMultipliers[monthKey as keyof typeof seasonalMultipliers];
      
      // Check if any festivals fall in this month (simplified approach)
      let festivalMultiplier = 1;
      if (monthKey === 'oct' || monthKey === 'nov') festivalMultiplier = festivalMultipliers['Diwali'];
      else if (monthKey === 'mar') festivalMultiplier = festivalMultipliers['Holi'];
      else if (monthKey === 'dec') festivalMultiplier = festivalMultipliers['Christmas'];
      
      // Calculate adjusted occupancy
      const adjustedOccupancy = Math.min(100, baseOccupancy * seasonalMultiplier);
      
      // Calculate adjusted nightly rate
      const adjustedNightlyRate = basePrice * Math.max(seasonalMultiplier, festivalMultiplier);
      
      // Calculate monthly revenue (simplified)
      const daysInMonth = 30; // simplified
      const revenue = (adjustedNightlyRate * daysInMonth * (adjustedOccupancy / 100));
      
      forecast.push({
        month: monthName,
        revenue: Math.round(revenue),
        occupancy: Math.round(adjustedOccupancy),
        nightlyRate: Math.round(adjustedNightlyRate)
      });
    }
    
    setForecastData(forecast);
    setShowForecast(true);
  };
  
  const totalRevenue = forecastData.reduce((sum, month) => sum + month.revenue, 0);

  return (
    <div className="w-full">
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">Revenue Forecast Tool</h2>
        <p className="text-[var(--color-text-light)] mb-6">
          Project your future earnings based on seasonal trends and historical data from the Indian vacation rental market.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Base Nightly Rate (₹)</label>
            <input 
              type="number" 
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="form-input"
              min="500"
              max="100000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Base Occupancy Rate (%)</label>
            <input 
              type="number" 
              value={baseOccupancy}
              onChange={(e) => setBaseOccupancy(Number(e.target.value))}
              className="form-input"
              min="1"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-light)] mb-1">Forecast Period (months)</label>
            <select
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="form-input"
            >
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <button 
            onClick={generateForecast}
            className="btn btn-primary px-8"
          >
            Generate Forecast
          </button>
        </div>
        
        {showForecast && (
          <div>
            <div className="bg-[var(--color-primary)]/10 p-4 rounded-lg border border-[var(--color-primary)]/20 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Projected {months}-Month Revenue</h3>
                <span className="text-xl font-bold text-[var(--color-primary)]">
                  ₹{totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[var(--color-text-light)] border-b border-[var(--color-border)]">
                    <th className="pb-2">Month</th>
                    <th className="pb-2">Projected Rate (₹)</th>
                    <th className="pb-2">Projected Occupancy</th>
                    <th className="pb-2">Projected Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {forecastData.map((month, index) => (
                    <tr key={index} className="border-b border-[var(--color-border)]">
                      <td className="py-3">{month.month}</td>
                      <td className="py-3">₹{month.nightlyRate.toLocaleString()}</td>
                      <td className="py-3">{month.occupancy}%</td>
                      <td className="py-3 font-medium">₹{month.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
              <h3 className="font-semibold mb-2 flex items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Revenue Optimization Tips
              </h3>
              <ul className="text-sm text-[var(--color-text-light)] space-y-1">
                <li>• Increase rates during festival periods like Diwali, Holi, and New Year</li>
                <li>• Consider offering discounts during monsoon season (July-September)</li>
                <li>• Implement dynamic pricing based on day of week (weekends +15-25%)</li>
                <li>• Offer special packages for long weekends and public holidays</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 