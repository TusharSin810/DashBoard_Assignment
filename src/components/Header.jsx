import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { switchRole, setUser } from "../redux/slices/roleSlice";
import { addMember } from "../redux/slices/membersSlice";

function Header() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.currentRole);
  const user = useSelector((state) => state.role.currentUser);
  const members = useSelector((state) => state.members);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    id: nanoid(),
    name: "",
    role: "member",
    status: "Offline",
    tasks: [],
  });

  const handleUserChange = (e) => {
    dispatch(setUser(e.target.value));
  };

  const handleRoleChange = (e) => {
    dispatch(switchRole(e.target.value));
  };

  const handleAddMember = () => {
    if (newMember.name.trim()) {
      dispatch(addMember({ id: Date.now(), ...newMember }));
      setNewMember({ id: nanoid(),name: "", role: "member", status: "active", tasks: [] });
      setIsModalOpen(false);
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center dark:bg-gray-800 bg-white p-4 rounded shadow gap-4 relative">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <label className="text-sm font-medium">Select User:</label>
        <select value={user} onChange={handleUserChange} className="border p-1 rounded dark:bg-gray-700">
          {members.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <label className="text-sm font-medium">Role:</label>
        <select value={role} onChange={handleRoleChange} className="border p-1 rounded dark:bg-gray-700">
          <option value="lead">Team Lead</option>
          <option value="member">Team Member</option>
        </select>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
      >
        Add Member
      </button>
      {isModalOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border shadow-lg p-4 mt-2 rounded z-10">
          <h3 className="text-lg font-semibold mb-2">Add New Member</h3>
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="border p-1 rounded w-full mb-2"
          />
          <select
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            className="border p-1 rounded w-full mb-2"
          >
            <option value="member">Team Member</option>
            <option value="lead">Team Lead</option>
          </select>
          <select
            value={newMember.status}
            onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
            className="border p-1 rounded w-full mb-2"
          >
            <option value="Working">Working</option>
            <option value="Offline">Offline</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-3 py-1 border rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMember}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;