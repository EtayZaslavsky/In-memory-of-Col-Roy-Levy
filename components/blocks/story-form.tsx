"use client";
import React, { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { useMutation } from '@apollo/client';

// Define a type for dynamic form data
type FormDataType = {
  [key: string]: string; // Form fields are dynamically defined as strings
};

// Component to render dynamic form fields
export const StoryForm = ({ data }) => {
  const [formData, setFormData] = useState<FormDataType>({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submitStory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setSubmitted(true); // Indicate that submission was successful
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  return (
    <Section>
      <Container className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2
          className="text-2xl font-semibold mb-4"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title || "Share Your Story About Roy"}
        </h2>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              כותרת לסיפור
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              הסיפור
            </label>
            <textarea
              name="content"
              onChange={handleChange}
              rows={15}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {/* <button
              type="submit"
              className="w-full p-2 bg-yellow-500 text-white font-semibold rounded"
            >
              {loading ? 'שולח...' : "שלח"}
            </button>
            {error && <p className="text-red-500">שגיאה: {error.message}</p>} */}
          </form>
        ) : (
          <p className="text-green-500">
            {data.successMessage || "Thank you for sharing your story!"}
          </p>
        )}

      </Container>
    </Section >
  );
};

// TinaCMS Schema for Dynamic Form
export const storyFormBlockSchema = {
  name: "storyForm",
  label: "Story Form",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "Share Your Story About Roy",
      buttonText: "Submit",
      successMessage: "Thank you for sharing your story!",
    },
  },
  fields: [
    {
      type: "string",
      label: "כותרת הטופס",
      name: "title",
    },
  ],
};
