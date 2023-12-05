import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroupCodeForm from "../components/GroupCodeForm";
import GroupNameForm from "../components/GroupNameForm";

const Group = () => {
  const connection_URL = "http://localhost:8000";

  async function handleGroupCodeSubmit(groupCode) {
    try {
      const response = await fetch(`${connection_URL}/join-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: groupCode,
        }),
      });

      if (response.ok) {
        // Group joined successfully
        console.log("User joined group");
      } else {
        const errorMessage = await response.text();
        console.error(`Error joining group: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error joining group:", error);
    }
  }

  async function handleGroupNameSubmit(groupName) {
    try {
      const response = await fetch(`${connection_URL}/group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName: groupName,
        }),
      });

      if (response.ok) {
        // Group created successfully
        console.log("Group created");
      } else {
        const errorMessage = await response.text();
        console.error(`Error creating group: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  }

  return (
    <div className="container">
      <h2>Enter Group Code:</h2>
      <GroupCodeForm handleSubmit={handleGroupCodeSubmit} />
      <h3>Don't Have a Group Code? Make a new Group:</h3>
      <GroupNameForm handleSubmit={handleGroupNameSubmit}/>
    </div>
  );
};

export default Group;
