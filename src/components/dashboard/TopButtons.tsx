const TopButtons: React.FC = () => {
  return (
    <div className="p-3 bg-slate-100">
      <div className="flex items-center justify-end gap-3">
        <button
          title="Delete selected"
          className="bg-rose-700 hover:bg-rose-900 flex items-center justify-center gap-4 px-6 py-2 rounded text-white"
        >
          <i className="fas fa-trash"></i>
          <span className="hidden md:block">Delete Selected</span>
        </button>

        <button
          title="Add Product"
          className="bg-blue-700 hover:bg-blue-900 flex items-center justify-center gap-4 px-6 py-2 rounded text-white"
        >
          <i className="fas fa-plus"></i>
          <span className="hidden md:block">Add Product</span>
        </button>
      </div>
    </div>
  );
};

export default TopButtons;
