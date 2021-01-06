import { configureStore, createSlice, createAsyncThunk, PayloadAction, getDefaultMiddleware } from '@reduxjs/toolkit';
import socketMiddleware, { wsMessage } from './stores/websocket';
import peerMiddleware, { p2pConnected, p2pConnect, p2pDisconnect } from './stores/peer';

export interface User {
	id: string,
}

export interface Room {
	name: string,
	id: string,
	host: User,
	peer?: User,
}

export enum ConnectionState {
	NotConnected,
	Connecting,
	Connected,
	Error,
}

export interface State {
	user_id?: string,
	rooms: Array<Room>,
	active_room?: string,
	p2p_connection_state: ConnectionState,
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

interface SetIDPayload {
	user_id: string,
}

const DEFAULT_STATE: State = {
	user_id: null,
	rooms: [],
	active_room: null,
	p2p_connection_state: ConnectionState.NotConnected,
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
		},
		SetID(state, action: PayloadAction<SetIDPayload>) {
			return { ...state, user_id: action.payload.user_id }
		},
	},
	extraReducers(builder) {
		builder.addCase(p2pConnected, (state, action) => {
			return { 
				...state, 
				p2p_connection_state: ConnectionState.Connected
			};
		});
		builder.addCase(p2pConnect, (state, action) => {
			return { 
				...state, 
				p2p_connection_state: ConnectionState.Connecting
			};
		});
		builder.addCase(p2pDisconnect, (state, action) => {
			return { 
				...state, 
				p2p_connection_state: ConnectionState.NotConnected
			};
		});
	}
})

const middleware = [socketMiddleware, peerMiddleware, ...getDefaultMiddleware()];

export const { AllRooms, CreatedRoom, RemovedRoom, JoinedRoom, SetID } = rootSlice.actions;
export default configureStore({ 
	reducer: rootSlice.reducer,
	middleware: middleware,
});

