import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import { deleteUser, getUsers } from "../api";
import toast from "react-hot-toast";

export const useUserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<
    "first_name" | "last_name" | "email" | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    let sortedUsers = [...filteredUsers];
    if (sortField) {
      sortedUsers.sort((a, b) => {
        const valueA = a[sortField].toLowerCase();
        const valueB = b[sortField].toLowerCase();
        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1;
        }
        return valueA < valueB ? 1 : -1;
      });
    }
    setFilteredUsers(sortedUsers);
  }, [sortField, sortDirection, users]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(currentPage);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setTotalPages(response.total_pages);
      setSelectedUsers([]); // Reset selection on page change
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (userId: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedUsers.length} users?`
      )
    ) {
      return;
    }

    try {
      await Promise.all(selectedUsers.map((id) => deleteUser(id)));
      toast.success("Selected users deleted successfully");
      setSelectedUsers([]);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete users");
    }
  };

  const handleSelect = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return {
    handleLogout,
    handleSelect,
    handleBulkDelete,
    handleDelete,
    handleSearch,
    fetchUsers,
    navigate,
    users,
    setUsers,
    filteredUsers,
    setFilteredUsers,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    selectedUsers,
    setSelectedUsers,
  };
};
