'use client';

import { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";

import { columns, User } from "@/app/components/columns";
import { DataTable } from "@/app/components/Data-Table";
import { UserForm } from "@/app/components/user-form";

const initialUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "user" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast.success("User deleted successfully");
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const column = columns(handleEdit, handleDelete);

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:max-w-7xl max-w-xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
        User Management
      </h2>

      <div className="border p-4 sm:p-6 rounded-xl shadow-sm bg-white dark:bg-zinc-900 sm:w-full w-80">
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


      <div className="overflow-x-auto rounded-xl border shadow-sm bg-white dark:bg-zinc-900 sm:w-full w-80">
        <DataTable columns={column} data={users} />
      </div>
    </div>
  );
}
