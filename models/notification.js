import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({

    owner:  { type: String, required: true },
                

    booking:  { type: String, required: true },
    

    description: { type: String, required: true },
        

     status: { type: String, default: "pending" }, 

     date: { type: String, required: true },

     currentTime: { type: Date, default: Date.now }
});

const Notifications = mongoose.models.Notifications || mongoose.model('Notifications', notificationSchema);

export default Notifications;