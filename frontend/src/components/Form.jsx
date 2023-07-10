import Button from "./Button";
import Input from "./Input";
const Form = ({ title }) => {
  return (
    <form className="rounded-md flex flex-col items-center p-4  border-2 rounded-md w-3/4 lg:w-2/4 h-96">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Input
        className="border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md w-2/4 p-3 mb-6 focus:border-sky-500"
        type="text"
        placeholder="Ruta transport"
        autoComplete="off"
        required
      />
      <textarea
        className="border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md w-2/4 p-3 mb-6 focus:border-sky-500"
        rows="5"
        placeholder="Detalii"
      />
      <Button text="Scaneaza Factura" />
    </form>
  );
};

export default Form;
