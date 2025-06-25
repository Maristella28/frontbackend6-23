import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbares from '../../components/Navbares';
import Sidebares from '../../components/Sidebares';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Home,
  MapPin,
  BadgeCheck,
  Landmark,
  Cake,
  Image as ImageIcon,
  Edit2,
  Save,
  X,
  ArrowLeft
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '', middle_name: '', last_name: '', name_suffix: 'none',
    birth_date: '', birth_place: '', age: '', email: '', contact_number: '',
    sex: '', civil_status: '', religion: '', full_address: '', years_in_barangay: '',
    voter_status: '', avatar: null, residents_id: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:8000/api/profile', {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
        });
        if (res.data) {
          setForm(prev => ({ ...prev, ...res.data }));
          setIsEditing(false);
        }
      } catch {
        setIsEditing(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'birth_date') {
      const birthYear = new Date(value).getFullYear();
      const thisYear = new Date().getFullYear();
      setForm(prev => ({ ...prev, [name]: value, age: thisYear - birthYear }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };
      let res;
      if (form.residents_id) {
        formData.append('_method', 'PUT');
        res = await axios.post('http://localhost:8000/api/profile/update', formData, { headers });
        alert('Profile updated successfully!');
      } else {
        res = await axios.post('http://localhost:8000/api/residents/complete-profile', formData, { headers });
        alert(`Profile created! Your Resident ID: ${res.data.residents_id}`);
      }
      navigate('/residents/dashboard');
    } catch (error) {
      const errMsg = error.response?.data?.errors
        ? Object.values(error.response.data.errors)[0][0]
        : 'Error saving profile. Please try again.';
      alert(errMsg);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500 text-lg">Loading profile...</div>;

  return (
    <>
      <Navbares />
      <Sidebares />

      <div className="max-w-screen-md mx-auto mt-24 px-4 flex justify-start">
        <button
          onClick={() => navigate('/residents/dashboard')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      <div className="max-w-screen-md mx-auto bg-white shadow-2xl rounded-2xl p-12 border border-gray-200 mb-32 mt-6">
        {!isEditing ? (
          <div className="flex flex-col items-center">
            <img
              src={typeof form.avatar === 'string'
                ? `http://localhost:8000/storage/${form.avatar}`
                : '/default-avatar.png'}
              alt="Avatar"
              className="w-32 h-32 object-cover rounded-full border-4 border-green-300 shadow mb-6"
            />

            <h2 className="text-3xl font-extrabold text-green-800 text-center">
              {form.first_name} {form.middle_name} {form.last_name} {form.name_suffix !== 'none' ? form.name_suffix : ''}
            </h2>

            {form.residents_id && (
              <div className="mt-2 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-green-600" />
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full font-semibold">
                  Resident ID: {form.residents_id}
                </span>
              </div>
            )}

            <p className="text-gray-600 mt-1 text-center flex items-center gap-1">
              <Mail className="w-4 h-4" /> {form.email}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-700 w-full mt-8">
              <Info label="Birthdate" icon={<Calendar />} value={form.birth_date} />
              <Info label="Age" icon={<Cake />} value={form.age} />
              <Info label="Sex" icon={<User />} value={form.sex} />
              <Info label="Contact" icon={<Phone />} value={form.contact_number} />
              <Info label="Voter" icon={<BadgeCheck />} value={form.voter_status} />
              <Info label="Status" icon={<Landmark />} value={form.civil_status} />
              <Info label="Religion" icon={<MapPin />} value={form.religion} />
              <Info label="Years in Barangay" icon={<Home />} value={form.years_in_barangay} />
              <div className="col-span-2 flex items-center text-sm text-gray-700 gap-1">
                <MapPin className="w-4 h-4" /> Address: {form.full_address}
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-10 px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-green-800 mb-10 text-center">
              {form.residents_id ? 'Edit Your Profile' : 'Complete Your Profile'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm((prev) => ({ ...prev, avatar: e.target.files[0] }))}
                  className="px-4 py-2 border rounded-md shadow-sm"
                />
                {form.avatar && (
                  <img
                    src={typeof form.avatar === 'string'
                      ? `http://localhost:8000/storage/${form.avatar}`
                      : URL.createObjectURL(form.avatar)}
                    alt="Preview"
                    className="mt-3 w-20 h-20 rounded-full object-cover border shadow"
                  />
                )}
              </div>

              {[
                { name: 'first_name', label: 'First Name*' },
                { name: 'middle_name', label: 'Middle Name' },
                { name: 'last_name', label: 'Last Name*' },
                { name: 'name_suffix', label: 'Name Suffix (e.g., Jr., Sr.)' },
                { name: 'birth_date', label: 'Birth Date*', type: 'date' },
                { name: 'birth_place', label: 'Birth Place*' },
                { name: 'age', label: 'Age*', readOnly: true },
                { name: 'email', label: 'Email*', type: 'email' },
                { name: 'contact_number', label: 'Contact Number*' },
                { name: 'religion', label: 'Religion*' },
                { name: 'years_in_barangay', label: 'Years in Barangay*' }
              ].map(({ name, label, type = 'text', readOnly }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm font-medium mb-2">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name] || ''}
                    onChange={handleChange}
                    readOnly={readOnly}
                    required
                    className="px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                  />
                </div>
              ))}

              {[
                { name: 'sex', label: 'Sex*', options: ['Male', 'Female', 'Other'] },
                { name: 'voter_status', label: 'Voter Status*', options: ['Registered', 'Unregistered'] },
                { name: 'civil_status', label: 'Civil Status*', options: ['Single', 'Married', 'Widowed', 'Separated'] }
              ].map(({ name, label, options }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm font-medium mb-2">{label}</label>
                  <select
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                  >
                    <option value="">Select</option>
                    {options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="md:col-span-2 flex flex-col">
                <label className="text-sm font-medium mb-2">Full Address*</label>
                <textarea
                  name="full_address"
                  value={form.full_address || ''}
                  onChange={handleChange}
                  rows="2"
                  className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row justify-center sm:space-x-4 mt-8 space-y-4 sm:space-y-0">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto bg-gray-400 hover:bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

// Optional helper component for cleaner info display
const Info = ({ label, icon, value }) => (
  <p className="flex items-center text-sm text-gray-700 gap-1">
    {React.cloneElement(icon, { className: 'w-4 h-4' })} {label}: {value}
  </p>
);

export default Profile;
