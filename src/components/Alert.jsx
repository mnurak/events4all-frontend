const Alert = ({ alert, message, className }) => {
  const alertStyles = {
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: "✅",
    },
    danger: {
      bg: "bg-red-100",
      text: "text-red-800",
      icon: "⛔",
    },
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      icon: "⚠️",
    },
    default: {
      bg: "bg-gray-200",
      text: "text-gray-800",
      icon: "ℹ️",
    },
  };

  const { bg, text, icon } = alertStyles[alert] || alertStyles.default;

  return (
    <div
      className={`flex items-center p-4 rounded-xl shadow-sm transition-all duration-300 ${bg} ${text} ${className}`}
    >
      <div className="text-2xl mr-3">{icon}</div>
      <div className="flex flex-col">
        <span className="font-semibold capitalize">{alert}</span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
