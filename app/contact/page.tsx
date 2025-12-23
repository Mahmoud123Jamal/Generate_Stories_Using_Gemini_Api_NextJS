"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { contactSchema } from "@/lib/validators";

type ContactFormData = yup.InferType<typeof contactSchema>;

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        reset();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow flex items-center justify-center p-4">
          <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-orange-100 max-w-lg mx-auto">
            <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <FiCheckCircle className="text-orange-500 text-6xl" />
            </div>
            <h2 className="text-3xl font-black text-gray-800">Magical!</h2>
            <p className="text-gray-500 mt-4 text-lg">
              Your message has landed in our library. We'll reach out to you
              soon!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn border-none bg-orange-500 hover:bg-orange-600 text-white mt-8 px-10 font-bold shadow-lg shadow-orange-200"
            >
              Send Another Message
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="grow flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full bg-white rounded-4xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Top Decorative Bar */}
          <div className="h-2 bg-orange-500 w-full" />

          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-gray-800 tracking-tight">
                Get in <span className="text-orange-500">Touch</span>
              </h2>
              <p className="text-gray-500 mt-3 font-medium">
                Have a question or feedback? We'd love to hear from you.
              </p>
            </div>

            {serverError && (
              <div className="alert alert-error mb-6 rounded-2xl flex items-center gap-3 text-white font-medium shadow-md">
                <FiAlertCircle className="text-2xl" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-gray-700">
                      Full Name
                    </span>
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Mahmoud Ghoraba"
                    className={`input input-bordered w-full rounded-xl focus:outline-orange-500 ${
                      errors.name ? "border-red-500" : "focus:border-orange-500"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs mt-1 font-medium italic">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-gray-700">
                      Email Address
                    </span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="mahmoud@example.com"
                    className={`input input-bordered w-full rounded-xl focus:outline-orange-500 ${
                      errors.email
                        ? "border-red-500"
                        : "focus:border-orange-500"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 font-medium italic">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">
                    Subject
                  </span>
                </label>
                <input
                  {...register("subject")}
                  placeholder="How can we help?"
                  className={`input input-bordered w-full rounded-xl focus:outline-orange-500 ${
                    errors.subject
                      ? "border-red-500"
                      : "focus:border-orange-500"
                  }`}
                />
                {errors.subject && (
                  <span className="text-red-500 text-xs mt-1 font-medium italic">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">
                    Message
                  </span>
                </label>
                <textarea
                  {...register("message")}
                  placeholder="Tell us more about your request..."
                  className={`textarea textarea-bordered w-full h-40 rounded-xl focus:outline-orange-500 ${
                    errors.message
                      ? "border-red-500"
                      : "focus:border-orange-500"
                  }`}
                />
                {errors.message && (
                  <span className="text-red-500 text-xs mt-1 font-medium italic">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="btn border-none bg-orange-500 hover:bg-orange-600 text-white w-full font-black text-lg flex items-center gap-3 h-16 rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-95 disabled:bg-gray-300"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <>
                    Send Message <FiSend className="text-xl" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
