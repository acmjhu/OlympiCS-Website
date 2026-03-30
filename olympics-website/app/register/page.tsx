// register
"use client";

// import { useState } from "react";
// import {registerUser} from "./actions";

/*
* Formerly Used Code, no longer used due to changes. 
* Non-styled menu 

export default function registerPage() {
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4 w-full max-w-md p-8 bg-white rounded-lg">
      <h1 className="text-4xl font-bold">Register</h1>
    <form action = {async (formData) => {
      const res = await registerUser(formData);
      if (res ?.error) setError(res.error);
    }}>
      <input name="email" type="email" placeholder = "Email" required className= "border p-2 rounded gap-4"/>
      <input name ="FirstName" type ="firstName" placeholder="First Name" required className= "border p-2 rounded gap-4"/>
      <input name = "LastName" type = "lastName" placeholder="Last Name" required className= "border p-2 rounded gap-4"/>
      <input name = "DietaryRestrictions" type = "dietaryResriction" placeholder="Dietary Resrictions" className= "border p-2 rounded gap-4"/>
      T-Shit-Size
      <select name = "T-Shirt Size" className= "border p-2 rounded gap-4">
        <option value ="extraSmall">XS</option>
        <option value ="small">S</option>
        <option value = "medium">M</option>
        <option value = "large">L</option>
        <option value = "extraLarge">XL</option>
      </select>
      {error && <p style={{ color: "red"}}>{error}</p>}
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
      Register
      </button>
    </form>
      
    </div>
    
  );
}
*/
import links from "@/data/links.json";


export default function registerPage() {
  return (
    // Added 'relative isolate', 'overflow-hidden', and 'bg-gray-900' to match the Home page
    <div className="relative isolate overflow-hidden bg-gray-900 flex flex-col items-center justify-center min-h-screen gap-4">
      
      {/* Decorative background shapes (Copied from Home) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-bl from-[#68ACE5] to-[#002D72] opacity-50 sm:left-1/2 sm:w-[72rem]"
        />
      </div>

      {/* Your Content */}
      <span className="text-4xl text-center text-white font-bold">
        Register Using the Link Below:
      </span> 
      <a 
        id="registration-link"
        href={links.registrationURL}
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-indigo-400 font-bold hover:text-indigo-300 hover:underline text-3xl transition-colors"
      >
        Register
      </a>
    </div>
  );
}
