import { configureStore, createSlice, createAsyncThunk, PayloadAction, getDefaultMiddleware } from '@reduxjs/toolkit';
import socketMiddleware, { wsMessage } from './stores/websocket';
import peerMiddleware from './stores/peer';

export interface User {
	id: string,
}

export interface Room {
	name: string,
	id: string,
	host: User,
	peer?: User,
}

export interface State {
	rooms: Array<Room>,
	active_room?: string,
}

interface AllRoomsPayload {
	rooms: Array<Room>
}

interface CreateRoomPayload {
	room: Room,
}

interface RemovedRoomPayload {
	room_id: string,
}

interface JoinedRoomPayload {
	room_id: string,	
}

const DEFAULT_STATE: State = {
	rooms: [],
	active_room: null,
};

const rootSlice = createSlice({
	name: 'root',
	initialState: DEFAULT_STATE,
	reducers: {
		AllRooms(state, action: PayloadAction<AllRoomsPayload>) {
			return Object.assign({}, state, {
				rooms: action.payload.rooms
			});
		},
		CreatedRoom(state, action: PayloadAction<CreateRoomPayload>) {
			return { ...state, rooms: state.rooms.concat(action.payload.room) }
		},
		RemovedRoom(state, action: PayloadAction<RemovedRoomPayload>) {
			return { 
				...state, 
				rooms: state.rooms.filter((room) => {
					return room.id !== action.payload.room_id;
				}), 
				active_room: state.active_room == action.payload.room_id ? null : state.active_room
			}
		},
		JoinedRoom(state, action: PayloadAction<JoinedRoomPayload>) {
			return { ...state, active_room: action.payload.room_id }
		}
	},
	extraReducers(builder) {
		// builder.addCase(createRoom.fulfilled, (state, action) => {
		// 	return { 
		// 		...state, 
		// 		rooms: state.rooms.concat(action.payload), 
		// 		active_room: state.rooms.length 
		// 	};
		// });
	}
})

const middleware = [socketMiddleware, peerMiddleware, ...getDefaultMiddleware()];

export const { AllRooms, CreatedRoom, RemovedRoom, JoinedRoom } = rootSlice.actions;
export default configureStore({ 
	reducer: rootSlice.reducer,
	middleware: middleware,
});

