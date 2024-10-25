"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import HCaptcha from '@hcaptcha/react-hcaptcha'; // Import hCaptcha component
import Link from "next/link";

// Define a type for dynamic form data
type FormDataType = {
  title: string;
  content: string;
  email?: string;
  phone?: string;
  hcaptchaToken?: string;
};

// Component to render the form
export const StoryForm: React.FC<{ data: any }> = ({ data }) => {
  const [formData, setFormData] = useState<FormDataType>({} as FormDataType);
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if hCaptcha is required in production
    if (process.env.NODE_ENV === 'production' && !captchaToken) {
      alert("Please complete the captcha");
      return;
    }

    try {
      const response = await fetch("/api/submitStory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, hcaptchaToken: captchaToken }),
      });

      if (response.ok) {
        setSubmitted(true); // Indicate that submission was successful
      } else {
        console.error("Error submitting story:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  // Handle captcha verification success
  const handleCaptchaVerification = (token: string) => {
    setCaptchaToken(token);
  };

  return (
    <Section>
      <Container className="max-w-lg mx-auto p-4 py-16 md:mb-8 rounded-lg shadow-md">
        <h2
          className="text-2xl font-semibold mb-4"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title || "שתף את הסיפור שלך על רועי"}
        </h2>
        <p className="text-l mb-8">
          לסיפורים נוספים ששותפו על רועי <Link className="underline" href="/friends-stories">עבור לדף חברים מספרים</Link>
        </p>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              כותרת לסיפור*
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="w-full p-2 border bg-[#FFF8CB] rounded"
            />
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              הסיפור*
            </label>
            <textarea
              name="content"
              onChange={handleChange}
              rows={15}
              className="w-full p-2 border bg-[#FFF8CB] rounded"
            />
            <label htmlFor="author_email" className="block text-sm font-medium mb-2">
              אימייל ליצירת קשר
            </label>
            <input
              type="text"
              name="author_email"
              onChange={handleChange}
              className="w-full p-2 border bg-[#FFF8CB] rounded"
            />
            <label htmlFor="author_phone" className="block text-sm font-medium mb-2">
              טלפון ליצירת קשר
            </label>
            <input
              type="text"
              name="author_phone"
              onChange={handleChange}
              className="w-full p-2 border bg-[#FFF8CB] rounded"
            />
            {/* Conditionally render hCaptcha in production */}
            {process.env.NODE_ENV === 'production' && (
              <HCaptcha
                sitekey="944ce64a-41fd-4dfa-af3b-92eb9a65c4b7"
                onVerify={handleCaptchaVerification}
              />
            )}

            <button
              type="submit"
              className="w-full p-2 bg-yellow-500 text-white font-semibold rounded"
            >
              שלח
            </button>
          </form>
        ) : (
          <p className="text-green-500">
            {data.successMessage || "תודה על ששיתפת את הסיפור שלך! נעבור עליו בהקדם ונוסיף אותו לאתר."}
          </p>
        )}
      </Container>
    </Section>
  );
};

// TinaCMS schema for the Story Form block
export const storyFormBlockSchema = {
  name: "storyForm",
  label: "טופס הוספת סיפור",
  ui: {
    previewSrc: "",
    defaultItem: {
      title: "שתף את הסיפור שלך על רועי",
      buttonText: "שלח",
      successMessage: "תודה על ששיתפת את הסיפור שלך!",
    },
  },
  fields: [
    {
      type: "string",
      label: "כותרת הטופס",
      name: "title",
    },
    {
      type: "string",
      label: "הודעת הצלחה",
      name: "successMessage",
    },
  ],
};
