// api.js

async function fetchUserProfile(token) {
    try {
      const response = await fetch(`https://finsage-server.vercel.app/api/user-profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // Include the JWT token in the headers
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      throw error;
    }
  }
  
  export { fetchUserProfile };
  