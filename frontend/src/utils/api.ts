const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const savePortfolio = async (portfolioData: any, token: string) => {
  const res = await fetch(`${API_URL}/portfolio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(portfolioData)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to save portfolio');
  }
  
  return res.json();
};

export const loginUser = async (credentials: any) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return res.json();
};

export const registerUser = async (credentials: any) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }
  
  return res.json();
};
