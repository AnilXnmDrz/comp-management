
const ProductList = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <h2 className="text-gray-600 font-bold">Product Name</h2>
              <h2 className="text-gray-600 font-bold">Description</h2>
              <h2 className="text-gray-600 font-bold">Price</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <p className="text-gray-600">Product 1</p>
              <p className="text-gray-600">Desc 1</p>
              <p className="text-gray-600">$0</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <p className="text-gray-600">Product 2</p>
              <p className="text-gray-600">Desc 2</p>
              <p className="text-gray-600">$0</p>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
              Add New Product
            </button>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default ProductList;
