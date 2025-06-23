import express from "express"
import User from "../model/user.js"
import { protectRoute } from "../middleware/authmiddleware.js"

const router = express.Router()

// router.post("/add-switch/:userId/:deviceId",protectRoute,async (req, res) => {
//     const { userId, deviceId } = req.params;
//     const { id, name } = req.body; 

//     try {
        
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });

        
//         const device = user.devices.find(dev => dev.deviceId === deviceId);
//         if (!device) return res.status(404).json({ message: "Device not found" });

//         const newSwitch = { id, name };
//         device.switches.push(newSwitch);

//         await user.save();

//         res.status(201).json({ message: "Switch added successfully", switch: newSwitch });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// router.get("/fetch/:userId/:deviceId",protectRoute,async(req,res)=>{
//     const { userId, deviceId } = req.params;
//     try {
//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });
//         const device = user.devices.find(dev => dev.deviceId === deviceId);
//         if (!device) return res.status(404).json({ message: "Device not found" });
//         res.status(200).json({ switches: device.switches });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// })

router.put("/rename-switch/:userId/:deviceId/:switchId", async (req, res) => {
    const { userId, deviceId, switchId } = req.params;
    const { newName } = req.body;

    try {
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        
        const device = user.devices.find(dev => dev.deviceId === deviceId);
        if (!device) return res.status(404).json({ message: "Device not found" });

        
        const switchItem = device.switches.find(sw => sw.id === switchId);
        if (!switchItem) return res.status(404).json({ message: "Switch not found" });

        
        switchItem.name = newName;
        await user.save();

        res.status(200).json({ message: "Switch renamed successfully", switchItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/rename-room/:userId/:deviceId", async (req, res) => {
    const { userId, deviceId} = req.params;
    const { newName } = req.body;

    try {
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        
        const device = user.devices.find(dev => dev.deviceId === deviceId);
        if (!device) return res.status(404).json({ message: "Device not found" });

    
        device.name = newName;
        await user.save();

        res.status(200).json({ message: "Switch renamed successfully", device });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/get-userId/:deviceId",async(req,res)=>{
    const {deviceId} =req.params;

    try {
        const user = await User.findOne({"devices.deviceId":deviceId})

        if(!user){
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ userID: user._id });

    } catch (error) {
        res.status(500).json({ error: "Server error" });       
    }

})

router.post('/add-device', async (req, res) => {
  const { email, device } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.devices.push(device);
    await user.save();

    res.status(200).json({ message: 'Device added successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


export default router