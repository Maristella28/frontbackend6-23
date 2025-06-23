import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      // 🔐 1. Login API
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setStatus(errorData.message || 'Invalid login credentials');
        return;
      }

      const { token, user } = await res.json();

      if (!token) {
        setStatus('No token received.');
        return;
      }

      // 💾 Save to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      // 🧠 Get user data with token (optional if already received)
      const userRes = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const userData = await userRes.json();

      if (!userRes.ok) {
        setStatus('Failed to retrieve user data.');
        return;
      }

      setUser(userData);
      setStatus('Login successful! Redirecting...');

      const { role, has_logged_in } = userData;

      // 🟡 First-time login handling for residents
      if (role === 'residents' && !has_logged_in) {
      console.log('🟡 First time login — sending PATCH to update has_logged_in...');

      try {
        const updateRes = await fetch('http://localhost:8000/api/user/update-login-status', {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (!updateRes.ok) {
          const err = await updateRes.json();
          console.warn('⚠️ Error updating login status:', err);
        } else {
          console.log('✅ First login status updated.');
        }
      } catch (error) {
        console.error('Error in PATCH request:', error);
      }

      // 👇 Redirect to complete profile
      navigate('/profile');
      return;
    }

      // ✅ Normal redirect
      setTimeout(() => {
        switch (role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'treasurer':
            navigate('/treasurer/dashboard');
            break;
          case 'staff':
            navigate('/staff/dashboard');
            break;
          case 'residents':
            navigate('/residents/dashboard');
            break;
          default:
            navigate('/');
        }
      }, 1000);

    } catch (err) {
      console.error('[Login Error]', err);
      setStatus('Login failed. Please try again.');
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden min-h-screen">
      <section className="flex items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md bg-white/60 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 ring-1 ring-gray-300 dark:ring-gray-600">
          <div className="flex flex-col items-center space-y-3">
            <img className="w-20 h-20 rounded-full shadow-lg" src="/assets/images/logo.jpg" alt="logo" />
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">Barangay e-Governance</h1>
            <p className="text-base text-gray-600 dark:text-gray-300 text-center font-medium">Login Portal</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-150 ease-in-out"
            >
              Sign In
            </button>
          </form>

          {status && (
            <p className="text-center text-sm mt-4 text-red-600 dark:text-red-400 font-medium">
              {status}
            </p>
          )}

          <div className="text-center pt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don’t have an account yet?{' '}
              <a href="/register" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">Sign up</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
