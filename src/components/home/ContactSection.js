import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSection = () => (
  <section
    id="contact"
    className="relative bg-gray-50 dark:bg-gray-900 py-20 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent dark:from-indigo-900/20" />

    <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center lg:text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          Contact <span className="text-indigo-600">Right Tech Centre</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
          Have questions about our programs, partnerships, or platform?  
          We’re here to help and would love to hear from you.
        </p>
      </motion.div>

      <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <Mail
            aria-label="Email icon"
            className="w-10 h-10 mx-auto text-indigo-600 mb-3"
          />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Email Us
          </h3>
          <a
            href="mailto:info@righttechcentre.com"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            info@righttechcentre.com
          </a>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <Phone
            aria-label="Phone icon"
            className="w-10 h-10 mx-auto text-indigo-600 mb-3"
          />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Call Us
          </h3>
          <p className="text-gray-600 dark:text-gray-400">+211 9XX XXX XXX</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <MapPin
            aria-label="Map pin icon"
            className="w-10 h-10 mx-auto text-indigo-600 mb-3"
          />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Visit Us
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Juba, South Sudan
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mt-16 text-center"
      >
        <Link
          to="/contact"
          className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-transform transform hover:-translate-y-1"
        >
          Send a Message
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
