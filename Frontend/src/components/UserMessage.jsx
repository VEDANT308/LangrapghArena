export default function UserMessage({ message }) {
  return (
    <div className="flex justify-end my-4 md:my-6">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 md:px-6 py-3 md:py-4 rounded-2xl rounded-br-sm max-w-[90%] md:max-w-[75%] shadow-lg shadow-blue-500/10 text-base md:text-lg leading-relaxed">
        {message}
      </div>
    </div>
  );
}