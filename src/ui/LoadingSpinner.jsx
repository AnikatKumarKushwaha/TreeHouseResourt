import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border-8 border-t-8 border-gray-200 rounded-full h-24 w-24 animate-spin"></div>
      <div className="mt-4 text-gray-600 text-lg">Loading...</div>
    </div>
  );
}
