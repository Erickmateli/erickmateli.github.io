import { useEffect } from "react";

const HOME_TITLE = "Erick Mateli — Senior Product Designer, UX & Frontend";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Erick Mateli` : HOME_TITLE;
  }, [title]);
}
