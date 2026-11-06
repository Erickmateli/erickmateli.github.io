import { useEffect } from "react";

const SITE = "Erick Mateli — Product Designer";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Erick Mateli` : `${SITE} & Frontend Engineer`;
  }, [title]);
}
