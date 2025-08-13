type PropTypes = {
  loading?: boolean;
};
export default function AuthSubmit({ loading, ...props }: PropTypes) {
  if (loading)
    return (
      <div className="flex h-10 flex-1 items-start justify-center">
        <div className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-1 font-medium text-white">
          <span className="material-symbols-outlined pointer-events-none animate-spin">
            progress_activity
          </span>
        </div>
      </div>
    );
  return (
    <div className="flex h-10 flex-1 items-start justify-center">
      <button
        type="submit"
        className="w-full cursor-pointer rounded-md bg-indigo-700 px-4 py-1 font-medium text-white hover:bg-indigo-600"
        {...props}
      >
        Submit
      </button>
    </div>
  );
}
