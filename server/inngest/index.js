import { Inngest } from "inngest";
import User from "../modals/User.js";

// ✅ Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup-app" });

/**
 * 🔹 Sync User Creation from Clerk
 */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("🔔 [Clerk] User Created Event Received:");
    console.log(JSON.stringify(event, null, 2));

    try {
      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;

      if (!email_addresses?.length) {
        console.warn("⚠️ No email found in Clerk event — skipping user creation.");
        return;
      }

      let baseUsername = email_addresses[0].email_address.split("@")[0];
      let username = baseUsername;

      // 🔄 Ensure unique username
      let exists = await User.findOne({ username });
      while (exists) {
        username = `${baseUsername}${Math.floor(Math.random() * 10000)}`;
        exists = await User.findOne({ username });
      }

      const userData = {
        clerk_id: id, // ✅ store Clerk user ID here
        email: email_addresses[0].email_address,
        full_name: [first_name, last_name].filter(Boolean).join(" "),
        username,
        profile_picture: image_url,
      };

      const createdUser = await User.create(userData);
      console.log("✅ User successfully created in MongoDB:", createdUser);
    } catch (error) {
      console.error("❌ Error while creating user:", error.message);
    }
  }
);

/**
 * 🔹 Sync User Update from Clerk
 */
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    console.log("🔔 [Clerk] User Updated Event Received:");
    console.log(JSON.stringify(event, null, 2));

    try {
      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;

      const userData = {
        email: email_addresses?.[0]?.email_address,
        full_name: [first_name, last_name].filter(Boolean).join(" "),
        profile_picture: image_url,
      };

      const updatedUser = await User.findOneAndUpdate(
        { clerk_id: id },
        userData,
        { new: true }
      );

      if (updatedUser) {
        console.log("✅ User successfully updated:", updatedUser);
      } else {
        console.warn("⚠️ User not found for update. Clerk ID:", id);
      }
    } catch (error) {
      console.error("❌ Error while updating user:", error.message);
    }
  }
);

/**
 * 🔹 Sync User Deletion from Clerk
 */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    console.log("🔔 [Clerk] User Deleted Event Received:");
    console.log(JSON.stringify(event, null, 2));

    try {
      const { id } = event.data;
      const deletedUser = await User.findOneAndDelete({ clerk_id: id });

      if (deletedUser) {
        console.log("✅ User successfully deleted:", deletedUser);
      } else {
        console.warn("⚠️ User not found for deletion. Clerk ID:", id);
      }
    } catch (error) {
      console.error("❌ Error while deleting user:", error.message);
    }
  }
);

// ✅ Export all functions for use in server.js
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
