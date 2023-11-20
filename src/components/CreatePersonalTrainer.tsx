"use client";

import { useMutation } from "@tanstack/react-query";
import { User } from "@/models/User";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import useToast from "@/hooks/useToast";

export default function CreatePersonalTrainer() {
  const { data: session } = useSession();
  const showToast = useToast();

  const mutation = useMutation({
    mutationFn: async (newUser: User) => {
      const url = "https://afefitness2023.azurewebsites.net/api/Users";

      if (session?.user?.token === undefined) {
        showToast("Authentication error!", "error");
        return;
      }
      try {
        const response = await axios.post(url, newUser, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });

        showToast("Personal Trainer created successfully!", "success");
        return response;
      } catch (error) {
        showToast("Error creating personal trainer!", "error");
        throw error;
      }
    },
  });

  const [formData, setFormData] = useState({
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType: "PersonalTrainer",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(formData);
    console.log("Form submitted:", formData);
  };

  return (
    <form className="max-w-md mx-auto my-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-600"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-600"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div className="text-center">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
}
