const API_BASE_URL = 'https://vtest.modernalgos.com';
const AUTH_TOKEN = 'Bearer Qy65p2Ahj/0ma3/Fbp6zD1YGuYuEQCN+tldas6iF7vVrrA3IkaA17Pz+hqXqycm8';

// Default headers
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': AUTH_TOKEN,
  'Source': 'WEB'
};

/**
 * Custom fetch wrapper with interceptors
 */
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers
    }
  };

  try {
    console.log(`🔍 API Request: ${config.method || 'GET'} ${url}`);
    
    const response = await fetch(url, config);
    
    // Parse JSON response
    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ API Error:', url, data);
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    console.log('✅ API Success:', url, data);
    return data;
    
  } catch (error) {
    console.error('❌ API Error:', url, error.message);
    throw error;
  }
};

// Symbol to Lot Size mapping - AS PER REQUIREMENT
export const SYMBOL_LOT_SIZE = {
  'NIFTY': 65,
  'BANKNIFTY': 30,
  'RELIANCE': 500,
  'SBIN': 750,
  'TATASTEEL': 5500
};

/**
 * Get symbols with lot sizes
 * This simulates an API endpoint as per requirements
 */
export const getSymbolsAPI = () => {
  console.log('📊 getSymbolsAPI called');
  return Object.keys(SYMBOL_LOT_SIZE).map(symbol => ({
    symbol,
    lotSize: SYMBOL_LOT_SIZE[symbol]
  }));
};

/**
 * Get lot size for a specific symbol
 */
export const getLotSize = (symbol) => {
  const lotSize = SYMBOL_LOT_SIZE[symbol?.toUpperCase()] || 1;
  console.log(`🔢 getLotSize(${symbol}) = ${lotSize}`);
  return lotSize;
};

/**
 * API 1: Technical Parameters LEFT SIDE (for dropdowns)
 */
export const getTechnicalParam = async (indicator = 'close') => {
  try {
    console.log(`🔍 Fetching technical_param with indicator: ${indicator}`);
    
    const data = await apiFetch('/technical_param', {
      method: 'POST',
      body: JSON.stringify({
        indicator: indicator
      })
    });
    
    console.log('📥 technical_param response:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching technical_param:', error);
    
    // Return fallback data for development
    console.warn('⚠️ Using fallback data for technical_param');
    return {
      Before: [
        { Name: "Close", Value: "close" },
        { Name: "Open", Value: "open" },
        { Name: "High", Value: "high" },
        { Name: "Low", Value: "low" }
      ],
      After: [
        { Name: "SMA", Value: "sma" },
        { Name: "EMA", Value: "ema" }
      ]
    };
  }
};

/**
 * API 2: Technical Parameters RIGHT SIDE
 */
export const getTechnicalParamRight = async (indicator = 'sma') => {
  try {
    console.log(`🔍 Fetching technical_param_right with indicator: ${indicator}`);
    
    const data = await apiFetch('/technical_param_right', {
      method: 'POST',
      body: JSON.stringify({
        indicator: indicator
      })
    });
    
    console.log('📥 technical_param_right response:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching technical_param_right:', error);
    
    // Return fallback data for development
    console.warn('⚠️ Using fallback data for technical_param_right');
    return {
      data: [
        { Name: "SMA", Value: "sma", Params: ["Period"] },
        { Name: "EMA", Value: "ema", Params: ["Period"] },
        { Name: "Super Trend", Value: "supertrend", Params: ["Period", "Multiplier"] },
        { Name: "RSI", Value: "rsi", Params: ["Period"] },
        { Name: "MACD", Value: "macd", Params: ["Fast", "Slow"] },
        { Name: "Bollinger Bands", Value: "bbands", Params: ["Period", "Std Dev"] }
      ]
    };
  }
};

/**
 * API 3: Default Strategies (Quick Configurations)
 */
export const getDefaultStrategies = async () => {
  const data = await apiFetch('/technical_default_strategies', {
    method: 'POST'
  });
  return data;
};

/**
 * API 4: Submit Backtesting
 */
export const submitBacktesting = async (payload) => {
  try {
    console.log('🚀 Submitting backtesting with payload:', JSON.stringify(payload, null, 2));
    
    const data = await apiFetch('/AT_BackTesting', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    
    console.log('✅ Backtesting submitted successfully:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error submitting backtesting:', error.message);
    throw error;
  }
};

/**
 * Build the complete backtesting payload
 */
export const buildBacktestPayload = (formData) => {
  const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 17);
  
  const payload = {
    validation: timestamp,
    Tabname: "AT_Backtest",
    Request: "ADD",
    Validity: formData.validity || "Intraday",
    symbolchart: formData.symbol,
    exchange: formData.exchange || "NSE",
    ExpiryType: formData.expiryType || "Weekly",
    TimeFrame: formData.timeFrame || "5",
    AT_EntryParameters: formData.entryParameters || [],
    AT_EntryParameters_Reverse: formData.entryParametersReverse || [],
    AT_TargetParameters: formData.targetParameters || [],
    AT_ExitParameters: formData.exitParameters || [],
    AT_DailyParamters: formData.dailyParameters || [],
    AT_TechnicalParameters: formData.technicalParameters || [],
    AT_TechnicalParametersExit: formData.technicalParametersExit || [],
    AT_ComputationTime: formData.computationTime || [],
    AT_BackTestParameters: formData.backTestParameters || []
  };
  
  console.log('📦 Built payload:', payload);
  return payload;
};

export default apiFetch;
