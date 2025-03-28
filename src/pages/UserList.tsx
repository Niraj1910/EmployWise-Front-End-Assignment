import React from "react";

import {
  Edit2,
  Trash2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import { useUserList } from "../hooks/useUserList";

const UserList: React.FC = () => {
  const {
    currentPage,
    filteredUsers,
    handleBulkDelete,
    handleDelete,
    handleSearch,
    handleSelect,
    loading,
    searchQuery,
    selectedUsers,
    setCurrentPage,
    setSortDirection,
    setSortField,
    sortDirection,
    sortField,
    totalPages,
    handleLogout,
    setSelectedUsers,
    navigate,
  } = useUserList();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Users</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <select
                  value={sortField || ""}
                  onChange={(e) =>
                    setSortField(
                      e.target.value as
                        | "first_name"
                        | "last_name"
                        | "email"
                        | null
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Sort by...</option>
                  <option value="first_name">First Name</option>
                  <option value="last_name">Last Name</option>
                  <option value="email">Email</option>
                </select>
                <button
                  onClick={() =>
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {sortDirection === "asc" ? "↑ Asc" : "↓ Desc"}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Selected ({selectedUsers.length})
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                      onChange={() =>
                        setSelectedUsers(
                          selectedUsers.length === filteredUsers.length
                            ? []
                            : filteredUsers.map((user) => user.id)
                        )
                      }
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avatar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap w-12">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelect(user.id)}
                        className="h-4 w-4 text-indigo-600 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="h-10 w-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.first_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => navigate(`/users/${user.id}/edit`)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No users found matching your search
            </div>
          )}

          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
