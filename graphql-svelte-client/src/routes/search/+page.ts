import type { PageLoad } from "./$types";

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = ({ url }) => {
  const q = url.searchParams.get('q');
  console.log(q);

  return {
    q
  };
}