const Alert = ({ alert, message }) => {
  const alertStyles = {
    success: {
      bg: "bg-green-500",
      text: "text-blue-800",
    },
    danger: {
      bg: "bg-red-300",
      text: "text-red-900",
    },
    warning: {
      bg: "bg-yellow-500",
      text: "text-yellow-800",
    },
    default: {
      bg: "bg-gray-400",
      text: "text-gray-800",
    },
  };

  const { bg, text } = alertStyles[alert] || alertStyles.default;

  return (
    <div
      className={`w-full h-full flex items-center justify-center font-bold ${bg} ${text} rounded-3xl`}
    >
      <div className="mx-2 p-1 font-extrabold">{alert}!</div>
      <div className="mx-2 p-1">{message}</div>
    </div>
  );
};

export default Alert