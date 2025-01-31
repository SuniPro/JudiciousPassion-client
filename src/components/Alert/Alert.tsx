import toast from "react-hot-toast";

export function SuccessNotify(text?: string) {
  toast.success(text ? text : "Success");
}

export function ErrorNotify(text: string) {
  toast.error(text.length === 0 ? "Fail" : text);
}
