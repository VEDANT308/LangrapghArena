export default function UserMessage({ message }) {
  return (
    <div className="flex justify-end my-6">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-6 py-4 rounded-2xl rounded-br-sm max-w-[75%] shadow-lg shadow-blue-500/10 text-lg leading-relaxed">
        {message}
      </div>
    </div>
  );
}