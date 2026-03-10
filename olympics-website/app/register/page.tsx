// register
"use client";

import { useState } from "react";
import {registerUser} from "./actions";



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
