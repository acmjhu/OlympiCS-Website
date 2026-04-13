export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-20 text-gray-500">
      <p className="text-xl font-medium">{message}</p>
    </div>
  );
}
