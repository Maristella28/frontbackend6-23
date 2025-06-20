import React from 'react';
import Navbares from '../../components/Navbares';
import Sidebares from '../../components/Sidebares';

const Dashboard = () => {
  return (
    <>
      <Navbares />
      <Sidebares />

      <main className="bg-green-50 min-h-screen ml-64 pt-20 px-6 py-10 font-sans flex flex-col items-center">

        {/* Page Title */}
        <div className="w-full max-w-3xl mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900 tracking-wide border-b-4 border-green-400 inline-block pb-1">
            📢 Announcement
          </h1>
        </div>

        {/* Announcement Box */}
        <div className="w-full max-w-3xl bg-white border border-green-300 rounded-xl shadow-lg p-6 mb-8">
          <p className="text-gray-800 text-justify leading-relaxed text-sm sm:text-base">
            <strong className="block mb-1 text-green-700">Mahal na mamamayan ng Mamatid,</strong>
            Magandang araw sa inyong lahat. Nais naming iparating ang isang mahalagang anunsyo ukol sa peryahang nagsilbing bahagi ng ating mamamayan sa nakaraang ilang linggo.
            <br /><br />
            Ang peryahan na ating pinayagan at tinangkilik ay napagpasyahan na umalis matapos ang mahigit isang buwan at kalahating operasyon.
            <br /><br />
            Sa kabila ng kanilang pagsusumikap na magbigay saya at aliw sa ating mga kabarangay, hindi naging maganda ang takbo ng negosyo. Sa mga nakaraang linggo, napansin nila na ang bilang ng mga dumadayo sa peryahan ay hindi sapat upang magtagumpay.
            <br /><br />
            Ito ay nagdulot ng malaking pagkalugi para sa mga may-ari ng perya, lalo na sa kanilang araw-araw na gastos na umaabot sa 4,000 pesos para sa mga operasyon at sahod ng kanilang mga tauhan.
            <br /><br />
            Dahil dito, napagdesisyunan nila na magtapos na lamang ang kanilang negosyo sa ating barangay.
            <br /><br />
            <span className="font-semibold text-green-700">
              Maraming salamat po at nawa’y magpatuloy ang ating pagkakaisa para sa mas maliwanag na bukas.
            </span>
          </p>
        </div>

        {/* Image Box */}
        <div className="w-full max-w-3xl bg-white border border-green-300 rounded-xl p-4 shadow-lg">
          <img
            src="https://mamatidseniorhighschool.wordpress.com/wp-content/uploads/2017/08/mshspic.jpg"
            alt="Peryahan Image"
            className="rounded-lg object-cover w-full max-h-96 border border-green-200"
          />
        </div>

      </main>
    </>
  );
};

export default Dashboard;
