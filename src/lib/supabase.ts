import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// In a production environment, these would be environment variables
const supabaseUrl = 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper function to get the current session
export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Helper function to get the JWT token for API requests
export const getAuthToken = async () => {
  const session = await getSession();
  return session?.access_token;
};

// Helper function to handle API requests with authentication
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  
  return fetch(endpoint, {
    ...options,
    headers
  });
};

// Helper function to check API health
export const checkApiHealth = async () => {
  try {
    const response = await fetch('/health');
    return response.ok;
  } catch (error) {
    return false;
  }
};
