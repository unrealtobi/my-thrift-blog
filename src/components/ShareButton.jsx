"use client";
import { RiShareBoxLine } from "react-icons/ri";
export default function ShareButton({ title, description, url }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  return (
    <button
      onClick={handleShare}
      className=" inline-flex items-center  text-white rounded hover:bg-orange-600 focus:outline-none"
    >
      <RiShareBoxLine className="mr-2 text-customDeepOrange text-2xl" /> 
    </button>
  );
}
