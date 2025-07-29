function MemberCard({ member }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg">{member.name}</h2>
      <p className="mt-2 text-sm">Status: <span className="font-medium">{member.status}</span></p>
      <p className="text-sm">Tasks: {member.tasks.filter(t => t.progress < 100).length} active</p>
    </div>
  );
}

export default MemberCard;