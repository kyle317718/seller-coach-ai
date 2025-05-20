export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
      <strong className="font-bold">에러: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
