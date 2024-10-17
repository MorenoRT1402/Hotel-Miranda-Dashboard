import { toast, ToastOptions } from 'react-toastify';

export enum ToastType { Success = 'success', Error = 'error', Info = 'info', Warning = 'warning' };
export enum ToastPositions { TopLeft = 'top-left', TopRight = 'top-right', TopCenter = 'top-center', 
    BottomLeft = 'bottom-left', BottomRight = 'bottom-right', BottomCenter = 'bottom-center' }

export const showToast = (message: string, type = ToastType.Info, options?:ToastOptions) => {
    const defaultOptions: ToastOptions = {
        position: ToastPositions.TopCenter,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...options, 
    };

    const toastTypeMethod: Record<ToastType, (msg: string, opts: ToastOptions) => void> = {
        [ToastType.Success]: toast.success,
        [ToastType.Error]: toast.error,
        [ToastType.Info]: toast.info,
        [ToastType.Warning]: toast.warning,
    };

    toastTypeMethod[type](message, defaultOptions);
};
