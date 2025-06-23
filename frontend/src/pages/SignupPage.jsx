import React, { useState } from 'react';
import { axiosInstance } from '../lib/axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    devices: [
      {
        deviceId: '',
        name: '',
        password: '',
        switches: Array.from({ length: 5 }, (_, i) => ({
        id: `switch${i + 1}`,
        name: `name${i + 1}`
        }))
      }
    ]
  });

  const handleChange = (e, deviceIndex, switchIndex, field, isSwitch = false) => {
    const updatedForm = { ...formData };
    if (deviceIndex !== undefined && isSwitch) {
      updatedForm.devices[deviceIndex].switches[switchIndex][field] = e.target.value;
    } else if (deviceIndex !== undefined) {
      updatedForm.devices[deviceIndex][field] = e.target.value;
    } else {
      updatedForm[field] = e.target.value;
    }
    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/signup', formData);
      alert('Signup successful!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Signup failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-3xl mx-auto bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">User Signup</h2>

      <input type="text" placeholder="Username" value={formData.username}
        onChange={(e) => handleChange(e, undefined, undefined, 'username')}
        className="border p-2 w-full" required />

      <input type="email" placeholder="Email" value={formData.email}
        onChange={(e) => handleChange(e, undefined, undefined, 'email')}
        className="border p-2 w-full" required />

      <input type="password" placeholder="Password" value={formData.password}
        onChange={(e) => handleChange(e, undefined, undefined, 'password')}
        className="border p-2 w-full" required />

      {formData.devices.map((device, dIdx) => (
        <div key={dIdx} className="p-4 border rounded space-y-2">
          <h3 className="font-semibold">Device {dIdx + 1}</h3>

          <input type="text" placeholder="Device ID" value={device.deviceId}
            onChange={(e) => handleChange(e, dIdx, undefined, 'deviceId')}
            className="border p-2 w-full" required />

          <input type="text" placeholder="Device Name" value={device.name}
            onChange={(e) => handleChange(e, dIdx, undefined, 'name')}
            className="border p-2 w-full" required />

          <input type="password" placeholder="Device Password" value={device.password}
            onChange={(e) => handleChange(e, dIdx, undefined, 'password')}
            className="border p-2 w-full" required />

          {device.switches.map((sw, sIdx) => (
            <div key={sIdx} className="flex gap-2">
              <input type="text" placeholder={`Switch ${sIdx + 1} ID`} value={sw.id}
                onChange={(e) => handleChange(e, dIdx, sIdx, 'id', true)}
                className="border p-2 w-1/2" />

              <input type="text" placeholder={`Switch ${sIdx + 1} Name`} value={sw.name}
                onChange={(e) => handleChange(e, dIdx, sIdx, 'name', true)}
                className="border p-2 w-1/2" />
            </div>
          ))}
        </div>
      ))}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Signup</button>
    </form>
  );
};

export default SignupForm;
