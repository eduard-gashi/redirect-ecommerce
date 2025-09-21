import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);  // state to show booking success message

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const booking = {
      carId: selectedCar._id,
      email: formData.get('email'),
      pickupDate: formData.get('pickupDate'),
      returnDate: formData.get('returnDate'),
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        setBookingSuccess(true); // show message
        setSelectedCar(null);    // hide form
      } else {
        alert('Booking failed');
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('Something went wrong');
    }
  };



  useEffect(() => {
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched cars from server:', data);
        setCars(data);
      })
      .catch((err) => console.error('Error fetching cars:', err));
  }, []);


  return (
    <>
      {/* Header Section */}
      <header className="bg-white shadow-md p-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.jpg"
              alt="Logo"
              style={{ height: '100px', width: 'auto' }}
              className="object-contain"
            />
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-4 text-sm text-black">
            <a href="#" className="text-black">Meine Buchung</a>
            <a href="#" className="text-black">Kontakt</a>
            <select className="border rounded px-2 py-1 text-sm">
              <option>EUR EURO</option>
              <option>USD</option>
            </select>
          </nav>
        </div>
      </header>

      <div className="bg-gray-100 p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Willkommen bei Car Rental</h1>
        <p className="text-lg text-gray-700">Mieten Sie Ihr Traumauto einfach und schnell</p>
      </div>

      {/* Booking Success Message */}
      {bookingSuccess && (
        <div className="p-6 max-w-md mx-auto mt-10 bg-green-100 border border-green-400 text-green-800 rounded">
          <h3 className="text-xl font-bold mb-2">🎉 Booking Confirmed!</h3>
          <p>Thank you! Your car has been successfully reserved.</p>
          <button
            onClick={() => setBookingSuccess(false)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            OK
          </button>
        </div>
      )}


      {/* Main Content */}
      {selectedCar ? (
        // ✅ Detailed Car View with Booking Form
        <div className="p-12 bg-gray-100 min-h-screen flex flex-col items-center">
          <button
            onClick={() => setSelectedCar(null)}
            className="mb-6 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            ← Back to listings
          </button>

          <div className="flex flex-col sm:flex-row bg-white rounded shadow-lg p-6 gap-8 max-w-4xl w-full">
            {/* Image */}
            <img
              src={selectedCar.image}
              alt={`${selectedCar.brand} ${selectedCar.model}`}
              className="w-full sm:w-400 object-cover rounded"
            />

            {/* Details + Form */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {selectedCar.brand} {selectedCar.model}
              </h2>
              <p className="text-gray-600 mb-4">${selectedCar.pricePerDay} / day</p>

              <form onSubmit={handleBookingSubmit}>
                <label className="block mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="border p-2 mb-4 w-full"
                />

                <label className="block mb-2">Pick-up Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  required
                  className="border p-2 mb-4 w-full"
                />

                <label className="block mb-2">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  required
                  className="border p-2 mb-4 w-full"
                />

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Rent this car
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        // ✅ Car Listing View
        <div className="p-12 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Wähle ein Auto</h2>

          <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
            {cars.map((car, idx) => (
              <div key={idx} className="bg-white shadow-lg rounded-lg w-96 flex-shrink-0">
                <img
                  src={car.image}
                  alt={`${car.brand || 'Unknown'} ${car.model || ''}`}
                  className="w-full h-48 object-cover bg-gray-200"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {car.brand || 'Unknown'} {car.model || ''}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    {car.description?.length > 160
                      ? car.description.slice(0, 160) + '...'
                      : car.description}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {car.available ? 'Verfügbar' : 'Nicht verfügbar'}
                  </span>
                </div>

                <div className="flex justify-center mt-2 mb-4">
                  <button
                    onClick={() => setSelectedCar(car)}
                    className="bg-white text-black px-4 py-2 rounded border border-black hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-colors duration-200"
                  >
                    Ab {car.pricePerDay || '??'},- mieten
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
