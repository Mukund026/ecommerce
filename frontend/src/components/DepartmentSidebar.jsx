const departments = [
  "Amazon Launchpad",
  "Amazon Renewed",
  "Baby Products",
  "Bags, Wallets and Luggage",
  "Beauty",
  "Books",
  "Clothing & Accessories",
  "Computers & Accessories",
  "Electronics",
  "Garden & Outdoors",
  "Health & Personal Care",
  "Home & Kitchen",
  "Home Improvement",
  "Jewellery",
  "Kindle Store",
  "Movies & TV Shows",
  "Music",
  "Musical Instruments",
  "Office Products",
  "Pet Supplies",
  "Shoes & Handbags",
  "Sports, Fitness & Outdoors",
  "Toys & Games",
  "Video Games",
  "Watches"
];

const DepartmentSidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <h3 className="font-bold text-lg text-gray-900 mb-6 border-b pb-3">Any Department</h3>
      <ul className="space-y-3">
        {departments.map((dept, index) => (
          <li key={index}>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline block">
              {dept}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentSidebar;
