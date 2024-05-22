
const BranchManagement = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          Branch Management
        </h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="border border-gray-300 rounded-lg p-4 mb-8">
            <h2 className="text-xl font-bold mb-4">Branches</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-gray-600 font-bold">Branch Name</h3>
                <p className="text-gray-600">Branch 1</p>
                <p className="text-gray-600">Branch 2</p>
              </div>
              <div>
                <h3 className="text-gray-600 font-bold">Address</h3>
                <p className="text-gray-600">Address 1</p>
                <p className="text-gray-600">Address 2</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 mt-4">
              Add New Branch
            </button>
          </div>
          <div className="border border-gray-300 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Region Management</h2>
            <div>
              <h3 className="text-gray-600 font-bold">Region Name</h3>
              <p className="text-gray-600">Region 1</p>
              <p className="text-gray-600">Region 2</p>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 mt-4">
              Add New Region
            </button>
          </div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default BranchManagement