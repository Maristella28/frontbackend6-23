import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Registering...');
    setError('');

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setStatus('');
      return;
    }

    if (!form.termsAccepted) {
      setError("You must accept the terms and conditions.");
      setStatus('');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Invalid JSON response from server.');
      }

      if (res.ok && data.token) {
        localStorage.setItem('token', `Bearer ${data.token}`);
        setStatus('Registered successfully!');
        setError('');
        // Optionally redirect
        // window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Registration failed.');
        setStatus('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Network or server error.');
      setStatus('');
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <svg className="w-full h-full opacity-25" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#34D399', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="blur">
              <feGaussianBlur stdDeviation="50" />
            </filter>
          </defs>
          <circle cx="200" cy="150" r="100" fill="url(#grad1)" filter="url(#blur)">
            <animate attributeName="cy" values="150;450;150" dur="20s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="300" r="120" fill="url(#grad1)" filter="url(#blur)">
            <animate attributeName="cy" values="300;100;300" dur="25s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="500" r="80" fill="url(#grad1)" filter="url(#blur)">
            <animate attributeName="cy" values="500;200;500" dur="18s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <section className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white/60 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 ring-1 ring-gray-300 dark:ring-gray-600">
          <div className="flex flex-col items-center space-y-3">
            <img className="w-20 h-20 rounded-full shadow-lg" src="/assets/images/logo.jpg" alt="logo" />
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center leading-tight tracking-wide">
              Barangay e-Governance
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 text-center font-medium">
              Resident's Registration Portal
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="terms"
                type="checkbox"
                name="termsAccepted"
                checked={form.termsAccepted}
                onChange={handleChange}
                className="w-5 h-5 rounded border border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm font-light text-gray-600 dark:text-gray-300">
                I accept the
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400"> Terms and Conditions</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-150 ease-in-out"
            >
              Create an Account
            </button>

            {status && <p className="text-green-600 text-sm text-center">{status}</p>}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          </form>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <a href="/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-400"> Login here</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
