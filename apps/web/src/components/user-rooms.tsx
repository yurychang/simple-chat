import { RoomType } from '@/constants/enums';
import { useStore } from '@/store';
import { userId } from '@/store/user';
import { cn } from '@/utils/cn';

export function UserRooms() {
  const setCurrentRoom = useStore.use.setCurrentRoom();
  const currentRoomId = useStore.use.currentRoomId();
  const localRooms = useStore.use.localRooms();

  const remoteRooms = useStore.use.rooms();

  const rooms = [
    ...remoteRooms.map((room) => {
      if (room.type === RoomType.DM) {
        return {
          ...room,
          name: room.members.find((member) => member.id !== userId)?.name,
        };
      }
      return room;
    }),
    ...localRooms,
  ].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="mt-5">
      <p className="mb-3 text-gray-600">Rooms</p>
      <div className="space-y-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={cn('p-3 border rounded cursor-pointer', {
              'border border-amber-400 bg-amber-100': room.id === currentRoomId,
            })}
            onClick={() => setCurrentRoom(room.id)}
          >
            <p className="overflow-hidden text-clip whitespace-nowrap">
              {room.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
