import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

const ToastNotification = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entry animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      handleClose();
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'info':
      default:
        return <Info className="w-6 h-6 text-blue-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        max-w-sm w-full ${getBackgroundColor()} border-2 rounded-lg shadow-lg p-4
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{toast.title}</p>
          {toast.message && (
            <p className="mt-1 text-sm text-gray-600">{toast.message}</p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const ToastContainer = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3">
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          toast={toast}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
