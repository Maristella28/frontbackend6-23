import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    name_suffix: 'none',
    birth_date: '',
    birth_place: '',
    age: '',
    email: '',
    contact_number: '',
    sex: '',
    civil_status: '',
    religion: '',
    full_address: '',
    years_in_barangay: '',
    voter_status: '',
    avatar: null,
    residents_id: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (res.data) {
          setForm((prev) => ({ ...prev, ...res.data }));
          setIsEditing(false);
        }
      } catch {
        console.warn('No profile found');
        setIsEditing(true); // show editable form if profile doesn't exist
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
      const calculatedAge = thisYear - birthYear;
      setForm((prev) => ({ ...prev, [name]: value, age: calculatedAge }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key]);
      }
    });

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };

      let res;
      if (form.residents_id) {
        formData.append('_method', 'PUT'); // Laravel spoof method
        res = await axios.post('http://localhost:8000/api/profile/update', formData, { headers });
        alert('✅ Profile updated successfully!');
      } else {
        res = await axios.post('http://localhost:8000/api/residents/complete-profile', formData, { headers });
        alert(`✅ Profile created! Your Resident ID: ${res.data.residents_id}`);
      }

      navigate('/residents/dashboard');
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0];
        alert(`❌ ${firstError}`);
      } else {
        alert('❌ Error saving profile. Please try again.');
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
      {!isEditing ? (
        <div className="flex flex-col items-center">
          <img
            src={
              typeof form.avatar === 'string'
                ? `http://localhost:8000/storage/${form.avatar}`
                : '/default-avatar.png'
            }
            alt="Avatar"
            className="w-28 h-28 object-cover rounded-full border mb-4"
          />
          <h2 className="text-2xl font-semibold text-green-700 mb-1">
            {form.first_name} {form.middle_name} {form.last_name} {form.name_suffix !== 'none' ? form.name_suffix : ''}
          </h2>
          <p className="text-gray-600 mb-4">{form.email}</p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 w-full mt-4">
            <p><strong>Birthdate:</strong> {form.birth_date}</p>
            <p><strong>Age:</strong> {form.age}</p>
            <p><strong>Sex:</strong> {form.sex}</p>
            <p><strong>Contact:</strong> {form.contact_number}</p>
            <p><strong>Voter Status:</strong> {form.voter_status}</p>
            <p><strong>Civil Status:</strong> {form.civil_status}</p>
            <p><strong>Religion:</strong> {form.religion}</p>
            <p><strong>Years in Barangay:</strong> {form.years_in_barangay}</p>
            <p className="col-span-2"><strong>Address:</strong> {form.full_address}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
            {form.residents_id ? 'Edit Profile' : 'Complete Your Profile'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avatar Upload */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm((prev) => ({ ...prev, avatar: e.target.files[0] }))}
                className="px-4 py-2 border rounded-md"
              />
              {form.avatar && (
                <img
                  src={
                    typeof form.avatar === 'string'
                      ? `http://localhost:8000/storage/${form.avatar}`
                      : URL.createObjectURL(form.avatar)
                  }
                  alt="Preview"
                  className="mt-2 w-20 h-20 rounded-full object-cover"
                />
              )}
            </div>

            {/* Input Fields */}
            {[{ name: 'first_name', label: 'First Name*' },
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
                <label className="text-sm font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name] || ''}
                  onChange={handleChange}
                  readOnly={readOnly}
                  required={!label.includes('optional')}
                  className="px-4 py-2 border rounded-md"
                />
              </div>
            ))}

            {/* Dropdowns */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Sex*</label>
              <select name="sex" value={form.sex} onChange={handleChange} required className="px-4 py-2 border rounded-md">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Voter Status*</label>
              <select name="voter_status" value={form.voter_status} onChange={handleChange} required className="px-4 py-2 border rounded-md">
                <option value="">Select</option>
                <option>Registered</option>
                <option>Unregistered</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Civil Status*</label>
              <select name="civil_status" value={form.civil_status} onChange={handleChange} required className="px-4 py-2 border rounded-md">
                <option value="">Select</option>
                <option>Single</option>
                <option>Married</option>
                <option>Widowed</option>
                <option>Separated</option>
              </select>
            </div>

            {/* Full Address */}
            <div className="md:col-span-2 flex flex-col">
              <label className="text-sm font-medium mb-1">Full Address*</label>
              <textarea
                name="full_address"
                value={form.full_address || ''}
                onChange={handleChange}
                rows="2"
                className="px-4 py-2 border rounded-md"
              />
            </div>

            {/* Submit and Cancel */}
            <div className="md:col-span-2 flex justify-between gap-4 mt-4">
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
