'use client'

import { useRef, useState } from 'react'
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

export default function Example() {
  const [agreed, setAgreed] = useState(false)
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_dc4f4sq', 'template_kh559go', form.current, {
        publicKey: '3m0PNLQuCr1pEQZD-',

      })
      .then(
        () => {
          console.log('SUCCESS!');
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Votre email a été bien envoyé",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };


  return (
    <div className="mx-auto mt-16 max-w-6xl sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
  {/* IMAGE D'ÉTUDIANTS BINÔMES */}
  <div className="hidden md:block">
    <img
      src="https://plus.unsplash.com/premium_vector-1724334784981-d15ba9f551ef?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Binôme d'étudiants"
      className="rounded-lg shadow-lg shadow-[#0078A6]"
    />
  </div>

  {/* FORMULAIRE DE CONTACT */}
  <form ref={form} onSubmit={sendEmail} className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg shadow-[#0078A6]">
    <div className="grid grid-cols-1 gap-x-6 gap-y-6">
      <div>
        <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">
          Votre nom complet
        </label>
        <input
          id="first-name"
          name="from_name"
          type="text"
          required
          className="mt-2 block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
          Votre Email
        </label>
        <input
          id="email"
          name="from_email"
          type="email"
          required
          className="mt-2 block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
          Taper votre message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-2 block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          ✉️ Envoyer
        </button>
      </div>
    </div>
  </form>
</div>

  )
}
