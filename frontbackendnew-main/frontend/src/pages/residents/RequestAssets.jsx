import React from 'react';
import { Link } from 'react-router-dom';
import Navbares from "../../components/Navbares";
import Sidebares from "../../components/Sidebares";

const assetRecords = [
  {
    asset: 'Tent',
    date: '2025-06-01',
    price: 200,
    image: 'https://www.tentking.com.ph/homepage_files/61cbe2edf5803e96a0951a5a_107376870_1764998693671238_1165338404769420243_n.jpg',
  },
  {
    asset: 'Plastic Chairs (set of 10)',
    date: '2025-06-02',
    price: 100,
    image: 'https://www.furnituremanila.com.ph/wp-content/uploads/2019/08/502-Revolving-Mirror-with-Hanger-2.png',
  },
  {
    asset: 'Sound System',
    date: '2025-06-03',
    price: 300,
    image: 'https://palawan-news.com/wp-content/uploads/2020/09/rtn.jpg',
  },
  {
    asset: 'Table',
    date: '2025-06-04',
    price: 50,
    image: 'https://www.churchchairs4less.com/cdn/shop/files/493-Foot_Kid_s_Plastic_Folding_Table_2023-10-07T19-01-49Z_1_3000x.jpg?v=1699898676',
  },
  {
    asset: 'Commercial Space (1 day)',
    date: '2025-06-05',
    price: 500,
    image: 'https://www.realtynetwork.ph/wp-content/uploads/2022/03/commercial-space-for-rent-in-plaridel-st-mandaue-building-view.jpg',
  },
];

const handleRequest = (item) => {
  const current = JSON.parse(localStorage.getItem('requestedAssets')) || [];
  const alreadyRequested = current.some((r) => r.asset === item.asset && r.date === item.date);

  if (alreadyRequested) {
    alert('You have already requested this asset.');
    return;
  }

  const newRequest = {
    asset: item.asset,
    date: item.date,
    status: 'Pending',
  };

  localStorage.setItem('requestedAssets', JSON.stringify([...current, newRequest]));
  alert(`${item.asset} has been added to your request status.`);
};

const RequestAssets = () => {
  return (
    <>
      <Navbares />
      <Sidebares />
      <main className="bg-gradient-to-br from-green-50 to-white min-h-screen ml-64 pt-20 p-10 font-sans">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-800 tracking-tight">
            📦 Request Barangay Assets
          </h1>
          <Link to="/residents/statusassetrequests">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition">
              View Request Status
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {assetRecords.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-green-100"
            >
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.asset}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-green-800">{item.asset}</h3>
                <p className="text-2xl font-semibold text-green-600">₱{item.price.toFixed(2)}</p>
                <p>
                  <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                    Available: {item.date}
                  </span>
                </p>
                <button
                  onClick={() => handleRequest(item)}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow transition"
                >
                  Request Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default RequestAssets;
