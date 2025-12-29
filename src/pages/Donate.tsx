import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Donate() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the external donation URL
    window.location.href = 'https://app.irm.io/masjidalezz.com/where-most-needed';
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Redirecting to Donation Page...</h1>
        <p className="text-gray-600 mb-6">Please wait while we take you to our secure donation portal.</p>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          If you are not redirected automatically, 
          <a 
            href="https://app.irm.io/masjidalezz.com/where-most-needed" 
            className="text-primary hover:underline ml-1"
          >
            click here
          </a>.
        </p>
      </div>
    </div>
  );
}
