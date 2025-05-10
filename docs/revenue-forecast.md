# Revenue Forecast Component (Stayvillow)

This document describes the Revenue Forecast component, which is part of the Stayvillow host dashboard. This component helps hosts project their future earnings based on seasonal trends and historical data from the Indian vacation rental market.

## Overview

The Revenue Forecast tool provides hosts with data-driven projections of their potential earnings over a selected time period. It takes into account:

- Base nightly rate and occupancy
- Seasonal variations in the Indian tourism market
- Festival periods (Diwali, Holi, Christmas, New Year)
- Historical booking patterns

## Features

### Forecast Generator
- **Customizable Inputs**: Hosts can adjust base nightly rate, base occupancy rate, and forecast period
- **Flexible Time Ranges**: Options for 3, 6, or 12-month forecasts
- **Interactive Interface**: Simple UI for generating and viewing forecasts

### Seasonal Adjustments
- **Monthly Multipliers**: Each month has a specific multiplier based on Indian tourism patterns:
  - Peak Season (Oct-Mar): 1.1x to 1.4x multipliers
  - Shoulder Season (Apr-Jun): 0.9x to 1.0x multipliers
  - Low Season (Jul-Sep): 0.7x to 0.8x multipliers

### Festival Multipliers
- **Diwali**: 1.5x rate multiplier
- **Holi**: 1.3x rate multiplier
- **Christmas**: 1.4x rate multiplier
- **New Year**: 1.6x rate multiplier
- **Independence Day**: 1.2x rate multiplier
- **Republic Day**: 1.2x rate multiplier

### Forecast Results
- **Total Revenue Projection**: Aggregate expected revenue for the selected period
- **Monthly Breakdown**: Detailed table showing:
  - Projected nightly rate for each month
  - Projected occupancy percentage
  - Projected monthly revenue
- **Visual Presentation**: Clean, easy-to-read format with INR (₹) currency formatting

### Optimization Tips
- **Seasonal Strategies**: Recommendations for adjusting rates during different seasons
- **Festival Pricing**: Tips for maximizing revenue during festival periods
- **Discount Strategies**: Guidance on when to offer discounts during low season
- **Special Packages**: Suggestions for weekend and holiday packages

## Technical Implementation

The Revenue Forecast component is built with the following technologies:
- React functional component with hooks
- TypeScript for type safety
- CSS modules for styling
- Responsive design for all device sizes

### Key Functions

- `generateForecast()`: Calculates projected revenue based on input parameters
- Seasonal and festival multiplier calculations
- Data aggregation for total revenue projections

### Data Structure

The component accepts property data with the following structure:
```typescript
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
```

## Usage

The Revenue Forecast component is accessible from the host dashboard under the "Revenue Forecast" tab. To use the tool:

1. Navigate to the Host Dashboard
2. Click on the "Revenue Forecast" tab
3. Adjust the base nightly rate and occupancy rate if needed
4. Select the desired forecast period (3, 6, or 12 months)
5. Click "Generate Forecast" to view projections

## Integration Points

- The component can be connected to real historical booking data to improve forecast accuracy
- It can be extended with more sophisticated algorithms for greater precision
- API integration points for real-time market data are prepared in the component structure

## Future Enhancements

- **Advanced Algorithms**: Implement machine learning for more accurate predictions
- **Competitor Rate Analysis**: Include local market rates in the forecast calculations
- **Scenario Planning**: Allow hosts to compare different pricing strategies
- **Export Functionality**: Enable downloading forecast data as CSV or PDF
- **Historical Comparison**: Compare forecasts with actual performance over time 