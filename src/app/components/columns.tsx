"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export const columns = (
  onEdit: (user: User) => void,
  onDelete: (id: string) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="block max-w-[150px] truncate md:max-w-none">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="block max-w-[200px] truncate md:max-w-none">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("role")}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-wrap gap-2 justify-start items-center">
          <Button
            variant="outline"
            size="sm"
            className="min-w-[60px]"
            onClick={() => onEdit(user)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="min-w-[60px]"
            onClick={() => onDelete(user.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
