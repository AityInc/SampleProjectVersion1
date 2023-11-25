const CreateCase = ({ userId }: { userId: string }) => {
  return (
    <div className="mt-4">
      <a
        className="focus:shadow-outline-primary btn btn-info rounded-md bg-gray-300 px-4 py-2 text-black transition duration-300 ease-in-out hover:bg-gray-400 focus:outline-none"
        href={`/create-case/${userId}`}
      >
        Create Case
      </a>
    </div>
  );
};

export default CreateCase;
