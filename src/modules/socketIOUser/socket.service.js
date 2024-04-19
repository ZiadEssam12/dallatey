import SocketUser from "../../../DB/models/socketUser.js";
import User from "../../../DB/models/user.model.js";

const getActiveUsersInCity = async (governorate) => {
  try {
    // 1. Get all users in the governorate
    const usersInCity = await User.find({ "address.governorate": governorate });

    // 2. Find active socket users with matching user IDs
    const activeSocketUsers = await SocketUser.find({
      userId: { $in: usersInCity.map((user) => user._id) },
      isActive: true,
    });

    // 3. Create a map of active socket users for efficient lookup
    const activeSocketUserMap = new Map(
      activeSocketUsers.map((su) => [su.userId.toString(), su])
    );

    // 4. Build the final list with isActive status and additional information
    const finalList = usersInCity.map((user) => {
      const socketUser = activeSocketUserMap.get(user._id.toString());
      if (socketUser) {
        return {
          userId: user._id,
          socketId: socketUser.socketId, // Include socketId if needed
          isActive: true,
        };
      } else {
        return {
          userId: user._id,
          isActive: false,
        };
      }
    });
    return finalList;
  } catch (error) {
    console.error("Error fetching active users:", error);
    return [];
  }
};

export default getActiveUsersInCity;
