const Input = ({ 
    name, 
    type = "text", 
    placeholder,
    required = true,
    autoComplete = "off"
}) => {
  return( <input name={name} type={type} placeholder={placeholder} required = {required} autoComplete= {autoComplete}/>
    
  );
};
export default Input;
