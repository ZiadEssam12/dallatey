import SocketUser from "../../../DB/models/socketUser.js";

const getActiveUsersInCity = async (governorate) => {
  try {
    const activeSocketUsers = await SocketUser.find({
      isActive: true,
    }).populate("userId");

    const usersData = activeSocketUsers
      .filter((socketUser) => socketUser.userId.governorate === governorate)
      .map((socketUser) => ({
        userId: socketUser.userId._id,
        socketId: socketUser.socketId,
      }));

    return usersData;
  } catch (error) {
    console.error("Error finding users:", error);
    throw error;
  }
};

export default getActiveUsersInCity;
