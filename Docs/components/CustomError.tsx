export default function CustomError({ message }: { message: string }) {
  return (
    <div className="bg-red-200 text-red-800 px-4 py-2 rounded mt-4">
      <strong>에러:</strong> {message}
    </div>
  );
}
