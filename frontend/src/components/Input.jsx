
const Input = ({ name, type}) => {
    return (
        <input
            className="border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
            name={name} 
            type={type}
            />
    )
}
export default Input