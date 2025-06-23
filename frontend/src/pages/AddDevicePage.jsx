import React, { useState } from 'react';
import { axiosInstance } from '../lib/axios';

const AddDevicePage = () => {
  const [email, setEmail] = useState('');
  const [device, setDevice] = useState({
    deviceId: '',
    name: '',
    password: '',
    switches: Array.from({ length: 5 }, (_, i) => ({
      id: `switch${i + 1}`,
      name: `name${i + 1}`
    }))
  });

  const handleChange = (e, idx, field) => {
    const newSwitches = [...device.switches];
    newSwitches[idx][field] = e.target.value;
    setDevice({ ...device, switches: newSwitches });
  };

  const handleDeviceChange = (e) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/devices/add-device', {
        email,
        device
      });
      alert('Device added!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to add device');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Add Device to Existing User</h2>

      <input
        type="email"
        placeholder="User's Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <input
        type="text"
        placeholder="Device ID"
        name="deviceId"
        value={device.deviceId}
        onChange={handleDeviceChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="text"
        placeholder="Device Name"
        name="name"
        value={device.name}
        onChange={handleDeviceChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="password"
        placeholder="Device Password"
        name="password"
        value={device.password}
        onChange={handleDeviceChange}
        className="border p-2 w-full"
        required
      />

      {device.switches.map((sw, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            placeholder={`Switch ${idx + 1} ID`}
            value={sw.id}
            onChange={(e) => handleChange(e, idx, 'id')}
            className="border p-2 w-1/2"
          />
          <input
            type="text"
            placeholder={`Switch ${idx + 1} Name`}
            value={sw.name}
            onChange={(e) => handleChange(e, idx, 'name')}
            className="border p-2 w-1/2"
          />
        </div>
      ))}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Device
      </button>
    </form>
  );
};

export default AddDevicePage;
