import { createSlice, nanoid} from "@reduxjs/toolkit";

const membersSlice = createSlice({
    name: 'members',
    initialState: [],
    reducers: {
        setMembers: (state, action) => {
            return action.payload.map(user => ({
                id: nanoid(),
                name: `${user.name.first} ${user.name.last}`,
                status: 'Offline',
                tasks: [],
            }));
        },
        addMember: (state, action) => {
            state.push(action.payload);
        },
        updateStatus: (state, action) => {
            const member = state.find((m) => m.name === action.payload.name);
            if (member) member.status = action.payload.status;
        },
        assignTask: (state, action) => {
            const { memberName, task} = action.payload;
            const member = state.find((m) => m.name === memberName);
            if (member) member.tasks.push({ ...task, id: nanoid(), progress: 0});
        },
        updateProgress: (state, action) => {
            const { memberName, taskId, progress } = action.payload;
            const member = state.find((m) => m.name === memberName);
            if (member){
                const task = member.tasks.find((t) => t.id === taskId);
                if(task) task.progress = progress;
            }
        },
    }
});

export const {addMember, setMembers, updateProgress, assignTask, updateStatus} = membersSlice.actions;

export default membersSlice.reducer;