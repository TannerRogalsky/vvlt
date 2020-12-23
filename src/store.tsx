import { configureStore, createSlice, createAsyncThunk, PayloadAction, getDefaultMiddleware } from '@reduxjs/toolkit';

export interface Room {
	name: string,
}

export interface State {
	user_id?: number,
	rooms: Array<Room>,
	active_room?: number,
}

const DEFAULT_STATE: State = {
	user_id: null,
	rooms: [],
	active_room: null,
};

export const fetchRooms = createAsyncThunk('GET_ROOMS', async () => {
	let response = await fetch('room');
	return await response.json();
});

export const createRoom = createAsyncThunk('CREATE_ROOM', async () => {
	let response = await fetch('room', { method: 'POST', body: JSON.stringify({}) });
	return await response.json();
});

const rootSlice = createSlice({
	name: 'root',
	initialState: DEFAULT_STATE,
	reducers: {
		addRoom(state, action: PayloadAction<Room>) {
			return Object.assign({}, state, {
				rooms: state.rooms.concat(action.payload)
			});
		},
		setRooms(state, action: PayloadAction<Array<Room>>) {
			return Object.assign({}, state, {
				rooms: action.payload
			});
		},
		setUserId(state, action: PayloadAction<number>) {
			return Object.assign({}, state, {
				user_id: action.payload,
			});
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchRooms.fulfilled, (state, action) => {
			return { ...state, rooms: action.payload };
		});
		builder.addCase(createRoom.fulfilled, (state, action) => {
			return { 
				...state, 
				rooms: state.rooms.concat(action.payload), 
				active_room: state.rooms.length 
			};
		});
	}
})

export const { addRoom, setRooms, setUserId, } = rootSlice.actions;
export default configureStore({ reducer: rootSlice.reducer });

