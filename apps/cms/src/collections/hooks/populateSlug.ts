import { FieldHook } from "payload/types";

const populateSlug: FieldHook = ({ data }) => {
  const docStatus = (data?.status as string) ?? null
  if (docStatus !== "published") {
    const title = data?.title as string
    if (title) {
      return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
    }
  }
  return undefined
}

export default populateSlug;
