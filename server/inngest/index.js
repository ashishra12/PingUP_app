import { Inngest } from "inngest";
import User from "../modals/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup-app" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    console.log("User Created Event Received:", {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
    });

    let baseUsername = email_addresses[0]?.email_address.split("@")[0];
    let username = baseUsername;
    let exists = await User.findOne({ username });

    // Keep generating until unique
    while (exists) {
      username = `${baseUsername}${Math.floor(Math.random() * 10000)}`;
      exists = await User.findOne({ username });
    }

    const userData = {
      clerk_id: id, // store Clerk user ID here
      email: email_addresses[0]?.email_address,
      full_name: [first_name, last_name].filter(Boolean).join(" "), // safe join
      username,
      profile_picture: image_url,
    };

    await User.create(userData);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const userData = {
      email: email_addresses[0]?.email_address,
      full_name: [first_name, last_name].filter(Boolean).join(" "),
      profile_picture: image_url,
    };

    await User.findOneAndUpdate({ clerk_id: id }, userData, { new: true });
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    console.log("User Deleted Event Received:", { id });

    await User.findOneAndDelete({ clerk_id: id });
  }
);

// Export all functions
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
