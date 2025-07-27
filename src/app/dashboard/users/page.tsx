"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";

import { columns, User } from "@/app/components/columns";
import { DataTable } from "@/app/components/Data-Table";
import { UserForm } from "@/app/components/user-form"; // assumes you've written this

const initialUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "user" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Handle form submit (create or update)
  const handleSubmit = (data: Omit<User, "id">) => {
    if (editingUser) {
      setUsers(prev =>
        prev.map(user =>
          user.id === editingUser.id ? { ...user, ...data } : user
        )
      );
      toast.success("User updated successfully");
    } else {
      const newUser = { id: uuid(), ...data };
      setUsers(prev => [...prev, newUser]);
      toast.success("User created successfully");
    }
    setEditingUser(null);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast.success("User deleted successfully");
  };

  // Handle edit
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  // Memoized column generator with edit & delete
  const column = columns(handleEdit, handleDelete);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">User Management</h2>

      <div className="border p-4 rounded-xl shadow-sm">
        <UserForm
          onSubmit={handleSubmit}
          initialValues={
            editingUser
              ? {
                name: editingUser.name,
                email: editingUser.email,
                role: editingUser.role,
              }
              : undefined
          }
        />

      </div>

      <DataTable columns={column} data={users} />
    </div>
  );
}
