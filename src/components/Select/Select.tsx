import React, { useState, useEffect, useRef } from "react";
import { User } from "../../types";
import { UserCard } from "../UserCard/UserCard";
import { INITIAL_LIMIT, INITIAL_PAGE } from "../../constants";
import arrowDownIcon from "../../assets/down.png";
import { fetchUsers } from "../../api/fetchUsers";
import "./Select.css";

export const Select: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsers(page, INITIAL_LIMIT);
        setUsers((prev) => [...prev, ...data.data]);
        setHasMore(data.meta.to < data.meta.total);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [page]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const handleScroll = () => {
    if (!dropdownRef.current || !hasMore || isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setPage((prev) => prev + 1);
    }
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  return (
    <div className="select" ref={containerRef}>
      <h1 className="dropdown_title">Users</h1>
      <div className="select_label" onClick={toggleDropdown}>
        {selectedUser ? (
          <span>{`${selectedUser.last_name} ${selectedUser.first_name}, ${
            selectedUser.job || "No job"
          }`}</span>
        ) : (
          <span>Select a user</span>
        )}
        <img src={arrowDownIcon} />
      </div>

      {isOpen && (
        <div className="dropdown" ref={dropdownRef} onScroll={handleScroll}>
          {users.map((user) => (
            <div
              key={user.id}
              className={`dropdown_item ${
                selectedUser?.id === user.id && "dropdown_item_selected"
              }`}
              onClick={() => handleSelectUser(user)}
            >
              <UserCard
                firstName={user.first_name}
                lastName={user.last_name}
                job={user.job}
              />
            </div>
          ))}
          {isLoading && <div className="loading">Loading...</div>}
          {!hasMore && <div className="end">No more users</div>}
        </div>
      )}
    </div>
  );
};
