import Button from "./Button";

const Form = ({ title }) => {
  return (
    <form className="rounded-md flex flex-col items-center p-4 border w-2/5">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <input
        className="border-gray-400 border-2 text-gray-900 outline-none text-sm rounded-md w-2/4 p-3 mb-6 focus:border-sky-500"
        type="text"
        id="first_name"
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
