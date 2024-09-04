import notificationModel from "../model/notificationModel"



export const getNotifications = async (req, res) => {
    try {
        const { userId } = req.body

        const notification = await notificationModel.find({ to: userId }).populate({
            path: "from",
            select: "username profileImg",
        });
        await notificationModel.updateMany({ to: userId }, { read: true });

        res.status(200).json(notification);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error while get Nofication"
        })
    }
}


export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.body;
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error while Adding comment"
        })
    }
}