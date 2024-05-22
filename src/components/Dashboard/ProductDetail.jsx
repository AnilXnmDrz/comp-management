
const ProductDetail = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Product Detail</h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-gray-600 font-bold mb-2">
                Product Name:
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-bold mb-2">
                Description:
              </label>
              <textarea
                placeholder="Enter product description"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-bold mb-2">
                Price:
              </label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 mr-2">
                Edit
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
                Save
              </button>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default ProductDetail