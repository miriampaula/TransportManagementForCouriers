
const Input = ({ name, 
    type ="text", 
    placeholder,
     required = true, 
     autoComplete = "off", 
     onChange}) => {
    return (
        <input
            className="border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md p-3 focus:border-sky-500"
            name={name} 
            type={type}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            onChange={onChange}
            />
    )
}
export default Input