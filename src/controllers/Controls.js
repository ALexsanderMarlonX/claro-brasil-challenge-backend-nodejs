const User = require('../models/User')
const Dev = require('../models/Device')
const Session = require('../models/Session')

module.exports = {
    //update in name
    async update(req, res){
      if (req.user){
        const user = await User.findById(req.user);
        if (!user) {
          return res.json({ msg: 'User Not Exist' });
        }
        const a = await Dev.findOne({ deviceId: req.params.deviceId });
        
        if (!a) {
          return res.json({
            message: 'Device not found'
          });
        }
          const device = await Dev.findOneAndUpdate({deviceId: req.params.deviceId} , {
          $set: {name: req.body.name}
        }, 
        {new: true});
        return res.json({
          message: 'Device updated successfully',
          device: device
        });
      }
                return res.json({ msg: 'You are not logged in' });
    },
        //delete a device
  async delete(req, res){
    if (req.user) {
        const user = await User.findById(req.user);
        if (!user) {
          return res.json({ msg: 'User Not Exist' });
        }
        let device = await Dev.findOneAndDelete({ deviceId: req.params.deviceId }); 
      
        if (!device) {
          return rres.json({
            message: 'Device not found'
          });
        }
        
        let session = await Session.findOne({ createdby: req.user._id });  
        if(session.listDevices.length === 1) {
          return res.json({msg: 'cannot have less than one device registered'})
        }
        let inSession = session.listDevices.indexOf(device._id);
        let deviceToRemove = session.listDevices[inSession];

        return await Session.updateOne(
          { createdby: req.user._id },
         { $pull: { listDevices: { $in: [deviceToRemove] } } }
        ).then(() => res.json({ msg: 'Device deleted' })).catch(err => console.error(err));
      
      }
        return res.json({ msg: 'You are not logged in' });

    }
  }