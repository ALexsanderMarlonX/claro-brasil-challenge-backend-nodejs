const Dev = require('../models/Device');
const Session = require('../models/Session');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    if (req.user) {
      const {
        deviceId,
        name,
        system
      } = req.body;

      const {
        _id: userSessionId
      } = req.user;

      const user = await User.findById(req.user);
      if (!user) {
        return res.json({ msg: 'User Not Exist' });
      }

      const devExist = await Dev.findOne({ deviceId: deviceId });
      
      if (devExist) {
        return res.json(devExist);
      }
      
      const dev = await Dev.create({
        deviceId,
        name,
        createdby: user._id,
        system
      });

      const sessionExist = await Session.findOne({ createdby: user._id });
      if (!sessionExist) {
        const session = await Session.create({
          userSessionId,
          createdby: user._id,
          listDevices: dev._id
        });

        return res.json({ msg: 'Device Added To Session' })
      }

      if (sessionExist.listDevices.length === 3) {
        return res.json({ msg: "Devices Max " })
      }

      sessionExist.listDevices.push(dev._id);
      await sessionExist.save();
      return res.json({ msg: 'Device Added To Session' })
    }

    return res.json({ msg: 'You are not logged in' });
  }
  
}