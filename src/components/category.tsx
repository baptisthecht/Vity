export function Category({category}: {category: string}) {
    return <div className="bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition-colors duration-100 ease-in-out cursor-pointer font-medium">{category}</div> 
}