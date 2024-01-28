type Room = {
  id: string;
  name: string;
  members: string[];
};

const roomMap = new Map<string, Room>();
const userRoomMap = new Map<string, string[]>();
